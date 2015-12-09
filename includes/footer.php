

<div class="footer">
<div class="container">

<div class="col-xs-12 col-md-3">
	<h4>Other Pages </h4>
<ul>

<?php
$ip = substr($_SERVER['REMOTE_ADDR'], 0, 3);
?>

<?php
if ($ip == "192")  {
?>
				<li><a href="https://www.kickstarter.com/projects/torquing/zano-autonomous-intelligent-swarming-nano-drone">Kickstarter</a></li>
		<li><a href="//support.flyzano.com/?page_id=10">Careers</a></li>
		<li><a href="//support.flyzano.com/?page_id=16">Contact Us</a></li>
		<li><a href="http://www.torquinggroup.com/forum/">The Forum</a></li>

                 <?php } else { ?>


 				<li><a href="https://www.kickstarter.com/projects/torquing/zano-autonomous-intelligent-swarming-nano-drone">Kickstarter</a></li>
		<li>Careers</li>
		<li>Contact Us</li>
		<li><a href="http://www.torquinggroup.com/forum/">The Forum</a></li>



                  <?php } ?>
	
		
	</ul>

</div>

<div class="col-xs-12 col-md-3">
	<h4>Wall of fame </h4>

	To all of our <a href="https://www.kickstarter.com/projects/torquing/zano-autonomous-intelligent-swarming-nano-drone">kickstarter</a> backers...<br><br>
<?php
if ($ip == "192")  {
?>
	<a href="//flyzano.com/fame.php"><button type='submit' class='btn btn-zano'>THANK YOU</button></a>
  <?php } else { ?>

<span class="white">THANK YOU</span>
 <?php } ?>

</div>

<div class="col-xs-12 col-md-3">
	<h4>Latest from Twitter</h4>

	<div class="latestTweets"> </div>
</div>

<div class="col-xs-12 col-md-3">
	<h4>Follow us on</h4>
	<a href="https://www.facebook.com/flyzano" class="facebookLink"></a>
			<a href="https://www.youtube.com/user/flyzano" class="youTubeLink"></a>
			<a href="https://twitter.com/flyzano" class="twitterLink"></a>
			<a href="https://vimeo.com/flyzano" class="vimeoLink"></a>

</div>


</div>
</div>
<script src="js/global.min.js"></script>
<script>
$(".latestTweets").load("includes/tweet.php")
</script>