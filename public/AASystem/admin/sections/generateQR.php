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
					 date_default_timezone_set('Asia/Karachi');
					 
		            $codeContents = "Test Data".date('m/d/Y h:i:s a', time());
		     
		              // generating 
		            QRcode::png($codeContents, "qrcodes/".'021.png', QR_ECLEVEL_H,10); 
		             echo '<img width="55%" height="auto" src="'."qrcodes/".'021.png" />';
				?>
			</p>
			
		</div>
		
	</div>
</div>