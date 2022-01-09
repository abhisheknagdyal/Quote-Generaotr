
const imageContainer = document.getElementById('image-container');
const loader= document.getElementById('loader');


let ready = false;
let imagesLoaded =0;
let totalImages=0;
let photoArray= [];

// check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready= true;
        loader.hidden = true;
    }
}

const count =30;
const apikey= 'lneVHkuYcSIHifDaJ4wIMP-2Q5tEiEby9B9Gc0pO_sU';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}`;

// helper Fuction to set attribute on Dom Elements
function setAttributes(element , attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Creat Elemetns for links & photos, Add to DOM
function displayPhotos(){
    imagesLoaded= 0;
    // Run fuction for each object in photosArray
    photoArray.forEach((photo) =>{
        totalImages= photoArray.length;
        
        // create <a> to link to unsplah
        const item = document.createElement('a');
        // item.setAttribute('href' , photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });

        // create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img ,{
            src: photo.urls.regular,
            alt:photo.alt_description,
            title: photo.alt_description,
        });

        // Event listerne when loading is finished
        img.addEventListener('load' , imageLoaded);

        //Put the imgae in the anchor tag and both in image container
        item.appendChild(img);
        imageContainer.appendChild(item)
    });
}



// Get photo from unsplash 
async function getPhoto(){
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    }catch(error){

    }
}

// Check to see if the scrolling near bottom of page load more Photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready=false;
        getPhoto();

    }
});

// Onload
getPhoto();