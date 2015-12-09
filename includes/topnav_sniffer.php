<div class="mainHeader">
<div class="container">
	<div class="mobileMenu"> </div>
	<a class="toggleMobileMenu" href="javascript:openMobileMenu()"></a>
<div class="container">
<div class="header">
	<div class="col-md-3 logoHolder">
		<a class="homeLogo" href="#"></a> 
	</div>
	<div class="col-md-9 navs">
		<div class="row utilityNav">
		
		</div>
		<div class="row mainNav">
			<ul>

<?php
$ip = substr($_SERVER['REMOTE_ADDR'], 0, 3);
?>

<?php
if ($ip == "192")  {
?>
				 <li><a href="//flyzano.com">Home</a></li>
                 <li><a href="//flyzano.com/about.php">About ZANO</a></li>
                 <li><a href="http://www.flyzano.com/">Shop ZANO</a></li>
                 <li><a href="//flyzano.com/channel.php">Channel</a></li>
                 <li><a href="http://www.torquinggroup.com/forum/">Community</a></li>
                 <li><a href="//support.flyzano.com/">Support</a></li>
                 <li><a href="//account.flyzano.com/">My Account</a></li>

                 <?php } else { ?>


 				<li>Home</li>
                 <li>About ZANO</li>
                 <li>Shop ZANO</li>
                 <li>Channel</li>
                 <li>Community</li>
                 <li>Support</li>
                 <li><a href="//account.flyzano.com/">My Account</a></li>



                  <?php } ?>

			</ul>
		</div>
	</div>
</div>
</div>

</div>
</div>