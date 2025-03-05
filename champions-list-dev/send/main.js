
     
    listing_data.forEach(function(d) {
   
             champions_list_data.push({
                Name:  d['Full Name'] ,
                Region:  d['Region'] ,
                Point:  d['Person Score'] ,
                Geo:  d['Geo'],
                image:  d['Photo Link'] 
      });
    
        });
     
    var sorted = champions_list_data.sort(function(a, b) {return b.Point - a.Point});
    
    function prepareList(author) {
        var results = "";
        var FirstName_LastName_avatar="";
     
            const fullName = author.Name.split(' ');
       
        FirstName_LastName_avatar = (fullName[0]  ? fullName[0].charAt(0) : " ") + (fullName[1] ? fullName[1].charAt(0) : " ");
 
     
        results = `<div class="single-big-card border">
                                    <div class="single-big-card-top">
                                        <div class="avatar">
                                          ${!(author.image == " ") && !(author.image == "") && !(author.image == "-") ? '<img src="'+author.image +'" alt="avatar">': '<span>'+FirstName_LastName_avatar+'</span>'}
                                            
                                        </div>
                                        <div class="single-big-card-info">
                                            <div class="userName-region">
                                                <h2 class="search-h"> ${author.Name} </h2>
                                              
                                                <div class="right-region-geo">
                                                    <p> ${author.Region ? "REGION: "+ author.Region : " " }</p>
                                                    <p> ${author.Geo ? "GEO: "+ author.Geo : " " }</p>
                                                    </div>
                                            </div>
                                            <div class="user-point">
                                               
                                                <h5>${ author.Point > 99 ? 'Platinum'   : ( (author.Point > 49 && author.Point <99)  ? 'Gold' : 'Silver') } </h5>
                                                <p>${author.Point}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="last-update-text">
                                        <p>Last updated <span>Recently</span>  </p>
                                    </div>
                                </div>`;
        return results;
    }
    
    
    
    /*-------searching-------*/
     
    var notFound =`<div class="not-found">Not Found</div>`;
    function search() {
        var results = "";
         var count=0;
        var searchText = document.getElementById("filter_users").value;
         
        sorted.map(function (author) {
         
        var text = author.Name;
            var slicedText = text.slice(0, searchText.length);
       
            
            // if (searchText.toLowerCase().indexOf(slicedText.toLowerCase())!=-1) {
            if (text.toLowerCase().match(searchText.toLowerCase())) {
                 
                results += prepareList(author);
                count++;
            }
            
            // if(!text.toLowerCase().match(searchText.toLowerCase())){
            //     results = notFound;
               
            // }
    
            
        });
    
        if(searchText == ""){
    $('.search-result').html("");

            $('.all-card-wrapper').html(bigData_Array);
    $('.all-small-card').html(smallData_Array);
    
        }else{
    $('.search-result').html("Results "+count);

            $('.all-card-wrapper').html(results);
    
    $('.all-small-card').html("");
        }
     
      
    }
     
    
    document.getElementById("filter_users").addEventListener('keyup',search)
    
     
    
    
    // filter 
    var filter_btn=document.querySelector(".filter-btn-platinum");
    
    
         filter_btn.addEventListener('click',function(e){
            var results = "";
        var count = 0;
        e.preventDefault()
        var value_text=$(this).attr('data-value');
         
        sorted.map(function (author) {
         
       
           
        var text = author.Point;
       
            // var slicedText = text.slice(0, value_text.length);
       
             
            if(text >99){
             
                 
                results += prepareList(author);
                count++;
            }else{
                // console.log("heelo")
            }
    
            
        });
        
    $('.search-result').html("Platinum List Results "+count);
    $('.all-card-wrapper').html(results);
    $('.all-small-card').html("");
     
      
         })
    
    
    // filter gold
    var filter_btn=document.querySelector(".filter-btn-gold");
    
    
     
         filter_btn.addEventListener('click',function(e){
            var results = "";
        var count = 0;
        e.preventDefault()
        var value_text=$(this).attr('data-value');
         
        sorted.map(function (author) {
         
       
           
        var text = author.Point;
       
            // var slicedText = text.slice(0, value_text.length);
       
             
            if(text >49 && text <99){
             
                 
                results += prepareList(author);
                count++;
            }else{
                // console.log("heelo")
            }
    
            
        });
    $('.search-result').html("Gold List Results "+count);

    $('.all-card-wrapper').html(results);
    $('.all-small-card').html("");
     
      
         })
    
    // filter silver
    var filter_btn=document.querySelector(".filter-btn-silver");
    
    
     
         filter_btn.addEventListener('click',function(e){
            var results = "";
        var count = 0;
        e.preventDefault()
        var value_text=$(this).attr('data-value');
         
        sorted.map(function (author) {
         
       
           
        var text = author.Point;
       
            // var slicedText = text.slice(0, value_text.length);
       
             
            if(text < 50 ){
             
                 
                results += prepareList(author);
                count++;
            }else{
                // console.log("heelo")
            }
    
            
        });
    $('.search-result').html("Silver List Results "+count);

    $('.all-card-wrapper').html(results);
    $('.all-small-card').html("");
     
      
         })
    

// dropdown filter 
var geo_list=[]
     for(let a=0; a<sorted.length; a++){
                 geo_list.push(sorted[a].Geo)
     }
    

     var Region_list=[]
     for(let a=0; a<sorted.length; a++){
         
        Region_list.push(sorted[a].Region)
     }

 

function OptionList(author) {
   
     
   results = `<option  data-value="${author}" value="${author}">${author}</option>`;
   return results;
}



function dropdownFilter(array,htmlId){
    let array_list_store = array.filter((item, i, ar) => ar.indexOf(item) === i);

    var array_list_store_print="";
array_list_store.map((author)=>{

if(!(author == "") && !(author == "#N/A") && !(author == undefined)  && !(author == "eMEA") && !(author == "-")  ){
    array_list_store_print+=OptionList(author);
     
}

})

$(htmlId).html(array_list_store_print)

}
     


dropdownFilter(Region_list,"#selectOption")
dropdownFilter(geo_list,"#selectOption2")

 

// filter Region
var e = document.getElementById("selectOption");

function option_val(){
    var value = e.options[e.selectedIndex].value;
 
  
 
    var results = "";
        var count = 0;
       
        var value_text=$(this).attr('data-value');
        // console.log(value)
        sorted.map(function (author) {
         
       
        
        var text = author.Region;
       
      
             
            if(value == text){
             
                 
                results += prepareList(author);
                count++;
            } 
    
            
        });
    $('.search-result').html("Region List Results   "+count);

    $('.all-card-wrapper').html(results);
    $('.all-small-card').html("");
     


    }

var er = document.getElementById("selectOption2");

function option_val2(){
    var value = er.options[er.selectedIndex].value;
 
  // filter Region
 
    var results = "";
        var count = 0;
       
        var value_text=$(this).attr('data-value');
        // console.log(value)
        sorted.map(function (author) {
       
        var text = author.Geo;
         
            if(value == text){
             
                 
                results += prepareList(author);
                count++;
            } 
    
            
        });
    $('.search-result').html("GEO List  Results "+count);

    $('.all-card-wrapper').html(results);
    $('.all-small-card').html("");
     


    }

 
  
 
    
    
     
    
    

        
      
      var allCount=0;
    
    for(let i=0; i<sorted.length; i++){
     
        allCount++;
                                if(bigData_Array.length<10){
                                    const fullName = champions_list_data[i].Name.split(' ');
                                    const FirstName_LastName_avatar = fullName.shift().charAt(0) + fullName.pop().charAt(0);
     
                                    var big_card_template=`<div class="single-big-card">
                                    <div class="single-big-card-top">
                                        <div class="avatar">
                                          ${!(champions_list_data[i].image == " ") && !(champions_list_data[i].image == "") && !(champions_list_data[i].image == "-") ? '<img src="'+champions_list_data[i].image +'" alt="avatar">': '<span>'+FirstName_LastName_avatar+'</span>'}

                                            
                                        </div>
                                        <div class="single-big-card-info">
                                            <div class="userName-region">
                                                <h2> ${champions_list_data[i].Name} </h2>
                                                <div class="right-region-geo">
                                                    <p> ${champions_list_data[i].Region ? "REGION: "+ champions_list_data[i].Region : " " }</p>
                                                    <p> ${champions_list_data[i].Geo ? "GEO: "+ champions_list_data[i].Geo : " " }</p>
                                                    </div>
                                            </div>
                                            <div class="user-point">
                                               
                                                <h5>${ champions_list_data[i].Point > 100 ? 'Platinum'   : ( (champions_list_data[i].Point > 50 && champions_list_data[i].Point <100)  ? 'Gold' : 'Silver') } </h5>
                                                <p>${champions_list_data[i].Point}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="last-update-text">
                                        <p>Last updated <span>Recently</span>  </p>
                                    </div>
                                </div>`;
    
                                    bigData_Array.push(big_card_template)
                                }else{
    
                                    var small_card_template=`<div class="single-small-card">
                                    <div class="small-card-header">
                                        <h3>${champions_list_data[i].Name}</h3>
                                        <p>${champions_list_data[i].Region}</p>
                                       
                                    </div>
                                    <div class="small-card-footer">
                                        <h5>${ champions_list_data[i].Point > 99 ? 'Platinum'   : ( (champions_list_data[i].Point > 49 && champions_list_data[i].Point <100)  ? 'Gold' : 'Silver') } </h5>
    
                                        <p>${champions_list_data[i].Point}   </p>
                                    </div>
                                </div>`;
                                    smallData_Array.push(small_card_template)
                                }
                                
               
    }
    
    $('.search-result').html("Total Results "+allCount);
    
    $('.all-card-wrapper').html(bigData_Array);
     
    
     
    $('.all-small-card').html(smallData_Array);
     
     
    
     
        // reset 
        var filter_btn_reset=document.querySelector(".filter-btn-reset");
    
    filter_btn_reset.addEventListener('click',function(e){
 
    e.preventDefault()
$('.search-result').html("Total Results "+allCount);
    
    $('.all-card-wrapper').html(bigData_Array);
    $('.all-card-wrapper').html(bigData_Array);
$('.all-small-card').html(smallData_Array);
 
  
     })
     
     
    
   