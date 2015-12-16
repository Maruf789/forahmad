var album, pop;
var artist_id;
var api_key = "WHD0IITAIFZXJFO7I";
var biography;

function getRegTrackInfo(track_id){
	$.ajax({
    	type: "GET",
    	url:  "https://api.spotify.com/v1/tracks/"+track_id,
    	success:function(response){
    		album = response.album.name;
    		pop = response.popularity;
    		artist_id = response.artists[0].id;
    		sessionStorage.setItem("artid", artist_id);



    	}
    });

}

function getTrackInfo(track_id){
	getRegTrackInfo(track_id);

	$.ajax({
    	type: "GET",
    	//dataType: "jsonp",

		url:"http://developer.echonest.com/api/v4/track/profile?api_key=WHD0IITAIFZXJFO7I&id=spotify:track:"+track_id+"&bucket=audio_summary",
		
    	success: function(response){
    		console.log(response);
    		var artist, loud, key, mode, tempo, sig, dance, name;
    		console.log(response.response);
    		artist = response.response.track.artist;
    		name = response.response.track.title;
    		loud = response.response.track.audio_summary.loudness;
    		dance = response.response.track.audio_summary.danceability;
    		key = response.response.track.audio_summary.key;
    		mode = response.response.track.audio_summary.mode;
    		tempo = response.response.track.audio_summary.tempo;
    		sig = response.response.track.audio_summary.time_signature;

    		$('#search-res').append("<tr><td> Track Name: "+name+"</td><td> Album Name: "+album+"</td></tr>");
    		$('#search-res').append("<tr><td> Artist: "+artist+"</td><td> Popularity: "+pop+"</td></tr>");
    		$('#search-res').append("<tr><td> Loudness: "+loud+"</td><td> Danceability: "+dance+"</td></tr>");
    		$('#search-res').append("<tr><td> Key: "+key+"</td><td> Mode: "+mode+"</td></tr>");
    		$('#search-res').append("<tr><td> Tempo: "+tempo+"</td><td> Time Signature: "+sig+"</td></tr>");

    	}
	});



}
function getBiography(track_id){
	artist_id = sessionStorage.getItem("artid");
    

    $.ajax({
        type: "GET",
       

        url: "http://developer.echonest.com/api/v4/artist/biographies?api_key=WHD0IITAIFZXJFO7I&id=spotify:artist:"+artist_id, //4Z8W4fKeB5YxbusRsdQVPb",
        //url:"http://developer.echonest.com/api/v4/artist/biographies?api_key=" + api_key + "&id=spotify:artist:" + artist_id + "&format=json&results=1&start=0&license=cc-by-sa",
        
        success: function(response){
            //console.log(response);
            console.log(response.response.biographies);
            biography = response.response.biographies[0].text;
            $('#bio_blog').append("<td> <p>" + biography + "</p></td> ");
            //console.log("Artists's Biography: " + biography);
            //$('#bio_blog').append("<tr><td> <p>" + biography + "</p></td> ");
        }
    });
}

function getBlogpostBio(track_id){
	artist_id = sessionStorage.getItem("artid");

    $.ajax({
        type: "GET",
 

        url:"http://developer.echonest.com/api/v4/artist/blogs?api_key=" + api_key + "&id=spotify:artist:" + artist_id + "&format=json&results=1&start=0",
        
        success: function(response){
            console.log(response);
            var blog_url, blog_title, blog_summary;
            console.log(response.response);
         
            blog_url = response.response.blogs[0].url;
	        blog_title = response.response.blogs[0].name;
	        blog_summary = response.response.blogs[0].summary;
	     	console.log("Artists's blog_url: " + blog_url);
	        console.log("Artists's blog_title: " + blog_title);
	        console.log("Artists's blog_summary: " + blog_summary);

           	$('#bio_blog').append("<td> <h5> <strong> <a href='" + blog_url + "' target='_blank'>" + blog_title + "</a> <strong> <h5> <p>" + blog_summary + "<p> </td> </tr>");
        	
        }
    });
}

function getReviews(track_id){
    artist_id = sessionStorage.getItem("artid");

    $.ajax({
        type: "GET",
        

        url:"http://developer.echonest.com/api/v4/artist/reviews?api_key=" + api_key + "&id=spotify:artist:" + artist_id + "&format=json&results=1&start=0",
        
        success: function(response){
            console.log(response);
            console.log(response.response);
            reviews_url = response.response.reviews[0].url;
            reviews_title = response.response.reviews[0].name;
            reviews_summary = response.response.reviews[0].summary;
            console.log("Artists's reviews_url: " + reviews_url);
            console.log("Artists's reviews_title: " + reviews_title);
            console.log("Artists's reviews_summary: " + reviews_summary);
            $('#newsandreviews').append("<td> <h5> <strong> <a href='" + reviews_url + "' target='_blank'>" + reviews_title + "</a> <strong> <h5> <p>" + reviews_summary + "<p> </td>");
        }
    });
}
function getNews(track_id){
    artist_id = sessionStorage.getItem("artid");

    $.ajax({
        type: "GET",
     

        url:"http://developer.echonest.com/api/v4/artist/news?api_key=" + api_key + "&id=spotify:artist:" + artist_id + "&format=json&results=1&start=0",
        
        success: function(response){
            console.log(response);
            var news_url, news_title, news_summary;
            console.log(response.response);
            news_url = response.response.news[0].url;
            news_title = response.response.news[0].name;
            news_summary = response.response.news[0].summary;
            console.log("Artists's news_url: " + news_url);
            console.log("Artists's news_title: " + news_title);
            console.log("Artists's news_summary: " + news_summary);

            $('#newsandreviews').append("<td> <h5> <strong> <a href='" + news_url + "' target='_blank'>" + news_title + "</a> <strong> <h5> <p>" + news_summary + "<p> </td>");
        }
    });
}

function init(){
	var track_id = sessionStorage.getItem("track");
	getTrackInfo(track_id);
	getBiography(track_id);
	getBlogpostBio(track_id);

	getNews(track_id);
	getReviews(track_id);
	//console.log(track_id);




}

$(document).ready(init);