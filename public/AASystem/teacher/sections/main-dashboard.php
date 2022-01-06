<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item" aria-current="page">Dashboard</li>
  </ol>
</nav>
<div class="row">
	<div class="col-md-6">
		<div class="card" style="width: 18rem;">
		  <center><img src="media/avator.jpg" style="width: 150px; height: 150px;" class="card-img-top" alt="..."></center>
		</div>
	</div>
</div>
<div class="row">
  	<div class="col-md-6">
        <div class="card" style="width: 18rem;">
          
          <?php
            include('libs\qrlib\qrlib.php');
            $codeContents = "Dr.Naveed Ijaz, Senior Professor, naveedijaz@iqraisb.edu.pk, 03121234567"; 
     
              // generating 
            QRcode::png($codeContents, "qrcodes/".'020.png', QR_ECLEVEL_L, 4,10); 

            $name = "Dr.Naveed Ijaz";
            $qualification = "Phd";
            $post = "Senior Professor";
            
            echo '<div class="card-body">';
		    	echo '<h5 class="card-title">'.$name.'</h5>';
		    	echo '<p class="card-text"></p>';
	        echo '</div>';
	        echo '<ul class="list-group list-group-flush">';
	        	echo '<li class="list-group-item">'.$qualification.'</li>';
	        	echo '<li class="list-group-item">'.$post.'</li>';
	        echo '</ul>';
	        echo '</div>';
	        echo '</div>';
	        echo '<div class="col-md-6">';
	        echo '<center>';
	        echo '<blockquote class="blockquote text-center">';
	        echo '<p class="mb-0">QR CODE</p>';
	        echo '<footer class="blockquote-footer">Contains <cite title="Source Title">your information</cite></footer>';
	        echo '</blockquote>';
	        echo '<img width="300px" height="300" src="'."qrcodes/".'020.png" />';?>
      	</div>
	</div>
	</div>