<script type="text/javascript">
	setInterval(function(){
		window.location.reload(true);
	},15000);

</script>
<div class="container-fluid">
	<div class="row">
		<div class="col-md-12 justify-content-center" >
			
			<p class="text-center">
				
				<?php
					include('libs\qrlib\qrlib.php');
					$rand_arr = array("1","2","3","4");
					 date_default_timezone_set('Asia/Karachi');
		            //$codeContents = "Test Data".date('m/d/Y h:i:s a', time());

					//$date = new Date();
		     		//$timestamp = $date->getTimestamp();

		     		$subid = "CS-101";
		     		$rand_number = rand(0, count($rand_arr));
		     		//$rand_data = $rand_arr[$rand_number];
		     		$codeContents = time(). "," . $subid . "," . $rand_number;
		              // generating 
		            QRcode::png($codeContents, "qrcodes/".'021.png', QR_ECLEVEL_H,10); 
		             echo '<img width="55%" height="auto" src="'."qrcodes/".'021.png" />';
				?>
			</p>
			
		</div>
		
	</div>
</div>