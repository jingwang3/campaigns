<!DOCTYPE html>
<html lang="en" ng-app="campaignApp">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="Description" content="" />
	<title></title>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="bootstrap/css/bootstrap.campaign.min.css">
	<!-- Optional theme -->
	<link rel="stylesheet" href="bootstrap/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="styles/css/one-column.css">
	<!-- Latest compiled and minified JavaScript -->

  	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  	<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-3869537-22', 'auto');
	  ga('send', 'pageview');

	</script>
	<!--[if IE]>
	<style>
	    .IE-only {
	         display: block;
	    }
	</style>
	<![endif]-->
</head>
<body ng-controller="LocationsController">
  <header>
	<nav class="navbar navbar-fixed-top navbar-default hidden-xs">
	<div class="red-bar"></div>
	  <div class="container-fluid">
	  	<div class="navbar-left">
	      <a class="navbar-brand hidden-xs">
	        <img alt="Children's National Health System" height="100%" src="files/images/logo-lg.png">
	      </a>
	    </div>
      	<div class="navbar-right">
			<p class="navbar-text phone-number-box better-font">
			<span class="header-text-right">Make An Appointment:</span>
			<a href="tel:7035311555" trackingLabel="Phone Number on Top"><span class="header-appt-phone">(703) 531-1555</span></a>
			</p>
     	</div>
	  </div>
	</nav>
	<nav class="navbar navbar-default hidden-sm hidden-md hidden-lg">
	<div class="red-bar"></div>
	  <div class="container-fluid">
	  	<div class="navbar-left">
	      <a class="navbar-brand hidden-md hidden-sm hidden-lg brand-logo-link">
	        <img alt="Children's National Health System" width="120" src="files/images/logo-sm-120.jpg">
	      </a>
	    </div>
      	<div class="navbar-right">
			<p class="navbar-text phone-number-box better-font brand-text">
			<span class="header-text-right">Make An Appointment:</span>
			<a href="tel:7035311555" trackingLabel="Phone Number on Top"><span class="header-appt-phone">(703) 531-1555</span></a>
			</p>
     	</div>
	  </div>
	</nav>
  </header>
  <section id="content-body" name="top">
  	<div class="container-fluid content-wrap">
  		<!--World Renowed -->	
  		<article id="bannerSec">
	  		<div class="row row-1 content-row">
				<div class="col-xs-offset-6 col-xs-6">
	  				<div class="row1-caption">
	  					<h1>Our Cardiologists<br/>are World Renowed and Neighborhood Based.</h1>
						<p class="banner-subtitle">With multiple locations in Northern Virginia, our top pediatric cardiologists are always close to you.</p>
						<a class="btn better-font btn-form btn-cardio" id="scrollToMap" role="button" trackinglabel="Meet Cardiologists">Meet Our Virginia Cardiologists</a>
					</div>
				</div>
	  		</div>
  		</article>
  		<!--World Renowed -->	
  		<!--Expert Care -->
  		<article id="pawSec">
	  		<div class="row row-2 paw-row content-row">
	  			<div class="container">
		  			<div class="col-xs-8">
		  				<p class="new-color box-left">As experts in pediatric cardiology, Children's National has established a worldwide reputation for care and innovation. But our availability &mdash;being there for your child&mdash; is what matters the most. And while we're strongly established in Washington, DC, we're also right here in your neck of the woods: Northern Virginia.</p>
						<p class="new-color">Explore our locations and get acquainted with doctors that are just right for kids, and just right for you.</p>
		  			</div>
		  			<div class="col-xs-4">
		  				<div class="paw-box">
		  					<p class="paw-text">We're at the heart of the matter,<br>close to your child.</p>
		  				</div>
		  			</div>				
	  			</div>
	  		</div>
  		</article>
  		<!--Expert Care -->
  		<!--Meet Our Doctors -->
		<article id="docSec">
	  		<div class="row row-3 content-row meet-doctors">
	  			<a class="loc-pin" id="loc1" title="Leesburg" ng-click="loadDocs('leesburg')"></a>
	  			<a class="loc-pin" id="loc2" title="Arlington" ng-click="loadDocs('arlington')"></a>
	  			<a class="loc-pin" id="loc3" title="Fairfax" ng-click="loadDocs('fairfax')"></a>
	  			<a class="loc-pin active" id="loc4" title="Fredericksburg" ng-click="loadDocs('fredericksburg')"></a>
				<div class="container">
					<h1>Meet Your Doctors</h1>
					<div class="col-xs-6">
						<a id="closeBtn"><span class="glyphicon glyphicon-remove-circle doc-list-close" ng-if="filterExp.city != null" aria-hidden="true" ng-click="loadDocs(null)"></span></a>
						<div class="doc-list" ng-class="{shadowing: filterExp.city != null}">
							<div class="{{loc.name}} fade-in" ng-repeat="loc in locations | filter:filterExp">
								<div class="media campaign-media" ng-repeat="doc in loc.doctors">
								  <div class="media-left media-middle">
								    <a>
								      <img class="media-object" width="95" src="{{doc.image_url}}" alt="{{doc.name}}">
								    </a>
								  </div>
								  <div class="media-body doc-text-box">
								    <h4 class="media-heading doc-name lighter-font">{{doc.name}}</h4>
								    <h5 class="media-subheading doc-title lighter-font">{{doc.title}}</h5>
								    <h6 class="media-subheading doc-title-sub lighter-font">{{doc.sub_title}}</h6>
								    <ul class="doc-desc">
								    	<li ng-repeat="des in doc.desc">- {{des}}</li>
								    </ul>
								  </div>
								</div>
								<div class="doc-box-footer">
								<p>{{loc.name}}</p>
								<p>{{loc.desc}}</p>
								</div>	
							</div>	
						</div>
					</div>
				</div>
			</div>
	  		<div class="row row-3 content-row meet-doctors-mobile" >
	  			<a class="loc-pin" id="loc1" title="Leesburg" ng-click="loadDocs('leesburg')"></a>
	  			<a class="loc-pin" id="loc2" title="Arlington" ng-click="loadDocs('arlington')"></a>
	  			<a class="loc-pin" id="loc3" title="Fairfax" ng-click="loadDocs('fairfax')"></a>
	  			<a class="loc-pin active" id="loc4" title="Fredericksburg" ng-click="loadDocs('fredericksburg')"></a>
				<div class="container">
					<h1>Meet Your Doctors</h1>
					<p class="tap-text">[ tap the pins to learn more ]</p>
				</div>
			</div>
			<div class="row doc-list-mobile">
				<div class="{{loc.name}}" ng-repeat="loc in locations | filter:filterExp">
					<div class="media campaign-media" ng-repeat="doc in loc.doctors">
						<div class="media-left media-middle">
							<a>
								<img class="media-object" width="95" src="{{doc.image_url}}" alt="{{doc.name}}">
							</a>
						</div>
						<div class="media-body doc-text-box">
							<h4 class="media-heading doc-name lighter-font">{{doc.name}}</h4>
							<h5 class="media-subheading doc-title lighter-font">{{doc.title}}</h5>
							<h6 class="media-subheading doc-title-sub lighter-font">{{doc.sub_title}}</h6>
							<ul class="doc-desc">
								<li ng-repeat="des in doc.desc">- {{des}}</li>
							</ul>
						</div>
					</div>
					<div class="doc-box-footer">
						<p>{{loc.name}}</p>
						<p>{{loc.desc}}</p>
					</div>	
				</div>
			</div>
		</article>
        <!-- Meet Our Doctors -->
        <!--Why Children's -->
        <article id="whySec">
	  		<div class="row row-4 content-row">	
					<div class="container">
					<ul>
						<li>The combined years of training of our 35+ cardiology specialists is unmatched in the Washington, DC area.</li>
						<li>We perform the most pediatric surgeries in the Washington, DC area, with some of the highest success rates in the nation.</li>
						<li>Northern Virginia Magazine lists seven of our doctors as the top pediatric cardiologists in the area.</li>
						<li>We're a leader in clinical research programs and surgical innovations.</li>
						<li>U.S. News &amp; World Report consistently ranks us among the top pediatric hospitals in the nation.</li>
					</ul>
						<h3>Why Children's?</h3>		
					</div>
			</div>
		</article>
        <!-- Why Children's -->
        <!--Expert Care -->
        <article id="formSec">
	  		<div class="row contact-row content-row">
	  			<div class="container">
	  				<h1>Let's Talk</h1>
	  				<div class="text-center">
		  				<p class="text-center new-color text-museo">We're here to help. Call or schedule an appointment:</p>
		  				<a href="tel:7035311555" trackingLabel="Phone Number on Top"><span class="form-appt-phone better-font">(703) 531-1555</span></a>
	  					<p class="text-center new-color text-museo text-small">Or we can call you. Submit your info below:</p>
	  					<div class="well campaign-confirm hidden" id="formConfirmationBox">
	  						<h1>THANK YOU.</h1>
	  						<p>WE'LL BE IN TOUCH WITH YOU SHORTLY.</p>
	  					</div>
	  					<form class="campaign" action="https://docs.google.com/forms/d/1pf_-jg-bMcKUJ44xU6Tqr_juF1L-4VwgNseiX9MQZG0/formResponse" method="POST" id="ss-form" target="_self" onsubmit="">
	  						<div class="form-group">
	  							<b class="IE-only text-center">Your Name</b>
	  							<input class="form-control input-sm" id="userName" type="text" name="entry.916599135" placeholder="NAME" required>
	  						</div>
	  						<div class="form-group">
	  							<b class="IE-only text-center">Phone Number</b>
	  							<input class="form-control input-sm" id="userPhone" type="number" name="entry.354822211" placeholder="PHONE" required>
	  						</div>
	  						<div class="form-group">
	  							<b class="IE-only text-center">Zipcode</b>
	  							<input class="form-control input-sm" id="userZipcode" type="text" name="entry.272965353" placeholder="ZIP CODE" required>
	  						</div>
	  						<button type="submit" class="btn btn-form better-font">Submit</button>
	  					</form>
						<a class="top-link" href="#top">Back to top</a>
	  				</div>
	  			</div>
	  		</div>
	  		</article>
  		<!--Expert Care -->
  	</div>
  </section>
  <footer>
	  <div class="footer">
	      <div class="container">
	        <p class="text-muted text-center better-font"><a href="http://childrensnational.org/cardiology" trackingLabel="Footer CNHS Homepage Link"><span>childrensnational.org/cardiology</span></a></p>
	      </div>
	   </div>
   </footer>
   <script src="lib/js/jquery.min.js"></script>
   <script src="bootstrap/js/bootstrap.min.js"></script>
   <script src="lib/js/angular.min.js"></script>
   <script src="//childrensnational.org/~/media/cnhs-site/files/js/event_tracking.js"></script>
   <script src="lib/js/cardiologists.js"></script>
   <script src="lib/js/controller.js"></script>
</body>
</html>