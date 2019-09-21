window.onload = function () {
    var url = window.location.href.split("#")
    var route = url[url.length - 1]
    if (route === "selected") {
        this.pageTwo()
    }
}

function selectItem() {
    window.location.href = "#selected"
    pageTwo()
}

function pageTwo() {
    var main = document.querySelector("main")
    main.innerHTML = /*html*/`
    <div class="breadcrumb-container">
        <div class="breadcrumb">
            <h3>Women > <span id="home">Pants</span> > The Sideswept Dhoti</h3>
        </div>
    </div>
    <div class="item-overview">
        <div class="item-thumbnail">
            <img src="./assets/images/1.png" alt="" srcset="">
            <img src="./assets/images/2.png" alt="" srcset="">
            <img src="./assets/images/3.png" alt="" srcset="">
            <img src="./assets/images/4.png" alt="" srcset="">
            <img src="./assets/images/5.png" alt="" srcset="">
        </div>
        <div class="main-thumbnail">
            <img src="./assets/images/as.png" alt="" srcset="">
            <span>Share this product</span>
        </div>
        <div class="item-description">
            <h1>The Sideswept Dhoti + Bottom Line Grey (Silk)</h1>
            <div class="pricing">
                <h1 class="price">SGD 139.90</h1>
                <img src="./assets/images/Star Copy 3.png" alt="" srcset="">
                <img src="./assets/images/Star Copy 3.png" alt="" srcset="">
                <img src="./assets/images/Star Copy 3.png" alt="" srcset="">
                <img src="./assets/images/Star Copy 3.png" alt="" srcset="">
                <img src="./assets/images/Star Copy 3.png" alt="" srcset="">
                <span>4.8 of 5</span>
            </div>
            <h3>Description</h3>
            <p>Inspired by the continuous length of the lunghi or sarong seen in hot climates everywhere from South Asia to the Horn of Africa and southern</p>
            <span>SEE MORE</span>
            <table>
                <tr>
                    <th scope="col">Artisan Employment</th>
                    <td>54 jobs</td>
                </tr>
                <tr>
                    <th scope="col">Partnership</th>
                    <td>Randall Armstrong</td>
                </tr>
                <tr>
                    <th scope="col">In Collab</th>
                    <td>Augusta Mendoza</td>
                </tr>
            </table>
            <div class="sizecontainer-page2">
                    <span>SIZE</span>
                    <div class="btncontainer">
                        <div class="sizebtn">1</div>
                        <div class="sizebtn selected">2</div>
                        <div class="sizebtn">3</div>
                        <div class="sizebtn">4</div>
                        <span>SIZE GUIDELINES</span>
                    </div>
                    <span>Model is a US Size 2-4, wears Matter Size 1.175 cm tall.</span>
                    <div class="quantitycontainer">
                        <span>QUANTITY</span>
                        <div class="btncontainer">
                            <div class="quantitybtn">-</div>
                            <div class="quantitybtn selected">2</div>
                            <div class="quantitybtn">+</div>
                            <button class="main-btn">ADD TO CART</button>
                            <button class="secondary-btn">ADD TO WISHLIST</button>
                        </div>
                    </div>
                    <div class="features">
                        <h3>Features</h3>
                        <span>Gently curved waistband</span>
                        <span>Long self fabric waist belt</span>
                        <span>Seamless side profile</span>
                        <span>Back welt pocket with button</span>
                    </div>
                    <div class="features care">
                        <h3>Fabric Care</h3>
                        <span>Fabric Notes</span>
                        <p>Hand block with azo-free dyes. 90% Cotton 10% linen.</p>
                        <span>Care Instruction</span>
                        <p>Keep this garment separate in the first few washes to prevent colour runs. When washed garment runs clear, you can throw it into the machine with other like-coloured clothing. Always use delicate machine wash with cold water, or handwash cold for best result. Do not tumble dry. Line dry inside out. Iron inside out using a low-temperature setting.</p>
                    </div>
            </div>
        </div>
    </div>
    <img class="cover" src="./assets/images/Background.png" alt="" srcset="">
    <div class="middle-text">
        <p>

        Vel exercitationem quia nam. Quod saepe illo tempore quos voluptatem ut. Quis veritatis asperiores ea rerum. Cupiditate id neque esse necessitatibus sed delectus delectus accusamus.
        
        Impedit saepe ullam et similique quia. Sed vel voluptatem accusamus dignissimos minima fugiat quidem minus. Et velit quia consequatur maxime aut ut sunt enim. Est sit esse est magni nostrum enim. Est libero accusamus et suscipit consequuntur ut.
        
        Vitae laboriosam nihil aut consectetur maiores expedita culpa. Itaque reiciendis quibusdam et aut vel recusandae aut autem. Nam nobis porro nostrum illo. Natus quia magni officiis ut nam deleniti atque. Ut magnam est nihil repellendus. Repellat fuga neque distinctio id.
        
        Omnis dicta et et. Qui laboriosam qui dolor suscipit. Odio iste beatae qui vitae.
        
        Sed laudantium magnam totam nesciunt et. Vel earum veritatis corporis suscipit ea nisi dolorum. Dolor similique odio fugit rerum ut quaerat.
        </p>
    </div>
    <div class="rectangles">
        <div class="image">
            <img src="./assets/images/Rectangle 6.png" alt="" srcset="">  
            <span>Lorem ipsum dolor sit amet</span>
        </div>
        <div class="image">
            <img src="./assets/images/Rectangle s6.png" alt="" srcset="">  
            <span>Lorem ipsum dolor sit amet</span>
        </div>
        <div class="image">
            <img src="./assets/images/a.png" alt="" srcset="">  
            <span>Lorem ipsum dolor sit amet</span>
        </div>
    </div>
    <div class="middle-text2">
        <p>
        Vel exercitationem quia nam. Quod saepe illo tempore quos voluptatem ut. Quis veritatis asperiores ea rerum. Cupiditate id neque esse necessitatibus sed delectus delectus accusamus.
        </p>
    </div>
    `
    document.documentElement.scrollTop = 0;
    var home = document.getElementById("home");
    home.addEventListener('click', function () {
        window.location.href = "#home"
        main.innerHTML = `
    <div class="hero">
            <h1>Pants</h1>
            <p>Apparels</p>
        </div>
        <div class="breadcrumb-container">
            <div class="breadcrumb">
                <h3>Women > Pants</h3>
            </div>
            <div class="sort">
                <h3>Sort By </h3>
                <select name="" id="">
                    <option value="price">Price</option>
                </select>
            </div>
        </div>
        <div class="content">
            <div class="sidenav">
                <div class="filters">
                    <span>FILTERS</span>
                    <a href="#">RESET</a>
                </div>
                <div class="accordion">
                    <div class="item">
                        <h2 class="accordionheader">
                            Apparels
                        </h2>
                        <img src="./assets/images/Path 2s.png" alt="" class="down-arrow">
                    </div>
                    <div class="openitem">
                        <span class="open">PANTS</span>
                        <div class="subitem">
                            <span class="selected">SIDESWEPT DHOTI</span>
                            <span>LOUNGE DHOTI</span>
                            <span>SIDE DHOTI</span>
                            <span>MODERN MOPE</span>
                            <span>EASY DHOTI</span>
                            <span>CLASSIC WIDELEG</span>
                        </div>
                        <span>JUMPSUITS</span>
                        <span>SHORTS</span>
                        <span>TOPS</span>
                    </div>
                    <div class="item">
                        <h2 class="accordionheader">
                            Accessories
                        </h2>
                        <img src="./assets/images/Path 2s.png" alt="" class="up-arrow">
                    </div>
                    <div class="item">
                        <h2 class="accordionheader">
                            Houseware
                        </h2>
                        <img src="./assets/images/Path 2s.png" alt="" class="up-arrow">
                    </div>
                    <div class="item">
                        <h2 class="accordionheader">
                            Others
                        </h2>
                        <img src="./assets/images/Path 2s.png" alt="" class="up-arrow">
                    </div>
                    <div class="item">
                        <h2 class="accordionheader">
                            Techniques
                        </h2>
                        <img src="./assets/images/Path 2s.png" alt="" class="up-arrow">
                    </div>
                    <div class="item">
                        <h2 class="accordionheader">
                            Styles
                        </h2>
                        <img src="./assets/images/Path 2s.png" alt="" class="down-arrow">
                    </div>
                    <div class="openitem">
                        <span>BOLD</span>
                        <span>MONOCHROME</span>
                        <span>NEUTRALS</span>
                    </div>
                    <div class="sizecontainer">
                        <span>- SIZES</span>
                        <div class="btncontainer">
                            <div class="sizebtn">1</div>
                            <div class="sizebtn selected">2</div>
                            <div class="sizebtn">3</div>
                            <div class="sizebtn">4</div>
                        </div>
                        <span>SEE OUR SIZING GUIDE</span>
                    </div>
                </div>
            </div>
            <div class="thumbnails">
                <img src="./assets/images/Product/Product Card Copy 14.png" alt="" srcset="" onclick="selectItem()">
                <img src="./assets/images/Product/Product Card Copy 12.png" alt="" srcset="">
                <img src="./assets/images/Product/Product Card Copy 13.png" alt="" srcset="">
                <img src="./assets/images/Product/Product Card Copy 18.png" alt="" srcset="">
                <img src="./assets/images/Product/Product Card Copy 17.png" alt="" srcset="">
                <img src="./assets/images/Product/Product Card Copy 16.png" alt="" srcset="">
                <div class="loadingbtn">
                    <img src="./assets/images/s.png" alt="" srcset="">
                    <span>LOADING</span>
                </div>
            </div>
        </div>
    `
    }, false);
}
