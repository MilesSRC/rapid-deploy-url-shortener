/**
 * Rapid Deploy URL Shortener
 * By Dubst3pGam1ng/Miles Rush on Github
 * 
 * Liscensed GNU General Public License v3.0
 */
//NanoID
const { nanoid } = require('nanoid');

//Slug Schema
const yup = require('yup')
const schema = yup.object().shape({
    slug: yup.string().trim().matches(/[\w\-]/i),
    to: yup.string().trim().url().required()
})

//Router
const express = require('express');
const router = express.Router();

//Router Middleware
router.use(express.json());

//Databasing with MongoDB through Monk
const db = require('monk')(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`);
const slugs = db.get('slugs');
slugs.createIndex('slug to');

//Slug Information & Redirect
router.get("/:slug", async (req, res, next) => {
    try {
        var slug = req.params.slug;

        let data = await slugs.findOne({ slug: slug });
        if(!data)
            return res.status(404).send("Sorry, that link wasn't found.");
        
        return res.status(307).redirect(data.to);
    } catch(error) {
        next(error);
    }
});

//Get slug information
router.get("/slugs/:slug", async (req, res, next) => {
    try {
        var slug = req.params.slug;

        let data = await slugs.findOne({ slug: slug });
        if(!data)
            return res.status(404).send("Slug not found. 😢");
        
        return res.status(200).json(data);
    } catch(error) {
        next(error);
    }
})

//Create Slug
router.post('/shorten', async (req, res, next) => {
    try {
        //Deconstruct request body
        var slug = req.body.slug;
        var to = req.body.to;

        //If a slug doesn't exist, create one with nanoid.
        if(!slug)
            slug = nanoid(7)

        //Lowercase the slug by default for security reasons
        slug = slug.toLowerCase();

        //Validate against our slug schema
        await schema.validate({
            slug,
            to
        });

        //Check if the slug already exists
        let data = await slugs.findOne({ slug: slug });
        if(data)
            return res.status(409).send("Slug already exists.");

        //Check if a slug with the same url already exists to save on space.
        let other = await slugs.findOne({ to: to });
        if(other && !req.body.force)
            return res.status(200).json({
                slug: other.slug,
                to: to,
                existing: true
            });
        
        //Structure the slug
        var slugdata = {
            slug: slug,
            to: to,
        };

        //Insert slug into pile of slugs. :P
        slugs.insert(slugdata);

        //Send back data
        res.status(201).json(slugdata)
    } catch(error) {
        next(error);
    }
})

exports.path = '/';
exports.router = router;