window.addEventListener("load", function() {
    const container = this.document.querySelector(".container");

    jsonParse();

    async function jsonParse()  {
        const response = await this.fetch('data.json');
        const jsonData = await response.json();

        a(jsonData);
    }

    function a(jsondata) {
        for(var i = 0; i < jsondata.length; i++) {
            
            const div = this.document.createElement("div");
            div.className = "profile-box";
            div.innerHTML = 
            `<div class="box-left">
                <img class="logo" src=${jsondata[i]["logo"]}>
                <div class="content">
                  <ul>
                    <li class="company">${jsondata[i]["company"]}</li>
                    ${jsondata[i]["new"] ? '<li class="new">New!</li>' : ''}
                    ${jsondata[i]["featured"] ? '<li class="featured">Featured</li>' : ''}
                  </ul>
                  <ul>
                    <li class="position">${jsondata[i]["position"]}</li>
                  </ul>
                  <ul class="gray-part">
                    <li class="postedAt">${jsondata[i]["postedAt"]}</li>
                    <hr/>
                    <li class="contract">${jsondata[i]["contract"]}</li>
                    <hr/>
                    <li class="location">${jsondata[i]["location"]}</li>
                  </ul>
                </div>
            </div>
            <div class="box-right">
                <ul>
                  <li ><button>${jsondata[i]["role"]}</button></li>
                  <li ><button>${jsondata[i]["level"]}</button></li>
                </ul>
            </div>`;
      
            const ul = div.querySelector(".box-right ul");

            for(var j = 0; j < jsondata[i]["languages"].length; j++) {
                const li = document.createElement("li");
                const button = document.createElement("button");
                button.innerHTML= jsondata[i]["languages"][j];
                li.appendChild(button);
                ul.appendChild(li);
            }

            for(var j = 0; j < jsondata[i]["tools"].length; j++) {
                const li = document.createElement("li");
                const button = document.createElement("button");
                button.innerHTML= jsondata[i]["tools"][j];
                li.appendChild(button);
                ul.appendChild(li);
            }

            //applyFilterToProfile(div, profile);

            ul.addEventListener("click" , function(e) { // 오른쪽 카테고리 버튼 클릭 시.
                if(e.target.tagName !== "BUTTON") //버튼만. 
                    return;
            
                const categoryUl = document.querySelector(".category-box").querySelector("ul");
                const li = document.createElement("li");
                li.innerHTML = `
                    <button class="category-button">${e.target.innerHTML}</button>
                    <button class="remove-button">
                    <img src="images/icon-remove.svg" alt="remove">
                    </button>
                `;

                // const profileBoxs = container.querySelectorAll(".profile-box");
               
                
                // for(var box = 0; box < profileBoxs.length; box++) {
                //     const lis = profileBoxs[box].querySelector(".box-right").querySelector("ul").querySelectorAll("li");

                // }
                

                // ----------------Remove Evenet-------------------------

                const categoryBox = document.querySelector(".category-box");
            
                if(categoryBox.style.display === "" || categoryBox.style.display === "none") {
                    categoryBox.style.display = "flex";
                }
            
                const removeButton = li.querySelector(".remove-button");
                removeButton.onclick = () => {
                    li.remove();

                    if(categoryUl.querySelectorAll("li").length === 0) {
                        categoryBox.style.display = "none";
                    }
                }
                categoryUl.appendChild(li);
            });

            container.appendChild(div);
        }
    }
});

window.addEventListener("load" , function() {
    
    window.onload = updateImageSrc;
    window.onresize = updateImageSrc;

    function updateImageSrc() {
        var screenWidth = window.innerWidth;
        image = this.document.querySelector("#background-image");

        if (screenWidth <= 480) {
            image.src = "images/bg-header-mobile.svg";
        }
        else {
            image.src = "images/bg-header-desktop.svg";
        }
    }
});

window.addEventListener("load", function() {
    
    const categoryBox = document.querySelector(".category-box")

    const clearButton = categoryBox.querySelector(".clear-button");
    const ul = categoryBox.querySelector("ul");

    clearButton.onclick = () => {
        if(ul.querySelectorAll("li").length === 0) 
            return;

        categoryBox.style.display = "none";
        ul.innerHTML=``;
        
    };
});