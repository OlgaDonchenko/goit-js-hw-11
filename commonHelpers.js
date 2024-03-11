import{S as g,i as n}from"./assets/vendor-1f440181.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const c="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEZSURBVHgBrZVRDoMgDIar0fi6m2xH2Y3Ek2w3cFfZXXwBljFQCai0xemfoCaU/xNpKwAirXWrlDY5w8ViPhVmbgwIO14A3zeQKq/2IuwaqOu6A07+zaVUT8iUi+V28rd5NuSIOQs5wxyFUOZKqRtnmIpZQCZz3acWcgcXUjkF0b2bmwFSpAxskMAgYecaWSsFC8AgnHkMqIBR09TCGrnHsZic5iLs3By3ngWsITMgy9yphEyVJZjUM6esHUS9yfea7N7DAmJz/1niM2EhVBZR2UKl8DS/SFO80OhUnCBkoYWgz2MdNAx8q0jFOK/Fy1GQvdqYe50BQc3PgLDmRyCU+aYOfFsoCtPa+yXvp2/ue9rHqLATflCf5QflVUcNIrzeSwAAAABJRU5ErkJggg==";function A(r){const s="https://pixabay.com/api/",o="42458918-8f01ea81f4ffacec8edc4f5cf",i=new URLSearchParams({key:o,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${s}?${i}`).then(e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})}function h(r){return r.map(({webformatURL:s,largeImageURL:o,tags:i,likes:e,views:t,comments:a,downloads:m})=>`<li class="gallery-item">
              <a class="gallery-link" href="${o}">
                <img
                  class="gallery-image"
                  src="${s}"
                  alt="${i}"
                  width="360"
                />
              </a>
              <div class="info-block">
                <div class="block">
                  <h2 class="title">Likes</h2>
                  <p class="amount">${e}</p>
                </div>
                <div class="block">
                  <h2 class="title">Views</h2>
                  <p class="amount">${t}</p>
                </div>
                <div class="block">
                  <h2 class="title">Comments</h2>
                  <p class="amount">${a}</p>
                </div>
                <div class="block">
                  <h2 class="title">Downloads</h2>
                  <p class="amount">${m}</p>
                </div>
              </div>
            </li>`).join("")}function d(){new g(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()}const l=document.querySelector(".form-search"),u=document.querySelector(".gallery"),f=document.querySelector(".lds-heart");f.style.display="none";l.addEventListener("submit",p);function p(r){if(r.preventDefault(),l.elements.search.value.trim()===""){n.show({message:"The search query cannot be empty",timeout:5e3,close:!1,position:"bottomLeft",backgroundColor:"#ef4040",messageSize:16,messageColor:"#fff",title:"Sorry,",titleSize:16,titleColor:"#fff",iconUrl:c});return}f.style.display="block";const s=l.elements.search.value.trim();u.innerHTML="",A(s).then(o=>{o.hits.length||n.show({title:"Sorry,",message:"There are no images matching your search query. Please try again!",position:"bottomLeft",backgroundColor:"#ef4040",messageSize:16,messageColor:"#fff",titleSize:16,titleColor:"#fff",iconUrl:c}),u.insertAdjacentHTML("afterbegin",h(o.hits)),d(),l.reset()}).catch(o=>{console.log(o),n.show({title:"Sorry,",message:"Try again!",position:"bottomLeft",backgroundColor:"#ef4040",messageSize:16,messageColor:"#fff",titleSize:16,titleColor:"#fff",iconUrl:c})}).finally(()=>f.style.display="none")}
//# sourceMappingURL=commonHelpers.js.map
