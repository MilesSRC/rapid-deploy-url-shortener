/**
 * Rapid Deploy URL Shortener
 * By Dubst3pGam1ng/Miles Rush on Github
 * 
 * Liscensed GNU General Public License v3.0
 */

$(document).ready(()=>{
    const app = new Vue({
        el: "#cont",
        data: {
            endpoint: "" //Leave blank if served with the backend. Otherwise, put the backends location here.
        },
        methods: {
            shorten: (e) => {
                var slug = $("#slug");
                var to = $("#to");
                var force = $("#force");

                if(to.val().includes(`${window.location.host}`)){
                    return swal("Failed to create slug.", "You cannot link back to this site!", "error");
                }

                axios.post(`${app.endpoint}/shorten`, {
                    slug: slug.val(),
                    to: to.val(),
                    force: force[0].checked
                }).then(res => {
                    console.log(res);
                    if(res.data.to && res.data.slug){
                        console.log('ok')
                        swal("Created shortened link successfully", {
                            buttons: {
                                cancel: "Alrighty!",
                                copy: {
                                    text: "Copy link",
                                    value: "copy"
                                }
                            }
                        }).then(val => {
                            switch(val){
                                case 'copy':
                                    navigator.clipboard.writeText(`${window.location.origin}/${res.data.slug}`);
                                    swal("Link Copied!", "Link was copied to clipboard.", "success");
                            }
                        })
                    }
                }).catch(error => {
                    if(error.response){
                        if(error.response.status == 400){
                            if(error.response.data && error.response.data.name == "ValidationError"){
                                swal("Failed to create slug", `${error.response.data.message}`, 'error');
                            } else {
                                swal("Failed to create slug", `Failed to create slug with status code ${error.response.status}`, 'error');
                            }
                        } else if(error.response.status == 409) {
                            swal("Failed to create slug", `That slug (${slug.val()}) already exists!`, 'error');
                        } else {
                            swal("Failed to create slug", `Failed to create slug with status code ${error.response.status}`, 'error');
                        }
                    } else {

                    }
                })
            }
        }
    })
})