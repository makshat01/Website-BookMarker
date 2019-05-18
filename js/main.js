document.getElementById("myForm").addEventListener('submit',savebookmark);
function savebookmark(e)
{
    var siteName=document.getElementById("siteName").value;
    var siteUrl=document.getElementById("siteUrl").value;
    if(!validateForm(siteName,siteUrl)){
        return false;
    }

    var bookmark={
        name:siteName,
        url:siteUrl
    }

    if(localStorage.getItem('bookmarks')===null)
    {
        //Init array
        var bookmarks=[];
        //add to localstorage
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //re-set to loacalstorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    //clear form 
    document.getElementById("myForm").reset();
    //re-fetch bookmarks
    fetchBookMarks();
    if(confirm("are you sure?"))
    //prevent form from submitting
   e.preventDefault();
}

function deletebookmark(url){
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0; i<bookmarks.length; i++){
        if(bookmarks[i].url==url){
            //remove from array
            bookmarks.splice(i,1);
        }
    } 
    //reset back the localstorage..
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookMarks();
}




function fetchBookMarks(){
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    
    //get output id
    var bookmarksResults=document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML="";
    for(var i=0; i<bookmarks.length; i++){
        var name=bookmarks[i].name;
        var url=bookmarks[i].url;

        bookmarksResults.innerHTML+='<div class="well">'+
                                    '<h3>'+name+
                                    '<a id="btnvisit"class="btn btn-success" target="_blank" href="'+url+'">Visit</a>'+
                                    '<a  id="btndelete" onclick="deletebookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                    '</h3>'+                         
                                    '</div>';
    }
}

function validateForm(siteName,siteUrl){
    if(!siteName||!siteUrl){
        alert("Please Enter Valid SiteName and SiteUrl");
        return false;
    }
    var res =/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex=RegExp(res);
    if(!siteUrl.match(regex)){
        alert("Please Enter Valid URL");
        return false;
    }

    return true;
}