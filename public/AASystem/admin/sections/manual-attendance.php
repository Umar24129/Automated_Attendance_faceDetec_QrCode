<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">student Name</th>
      <th scope="col">student Id</th>
      <th scope="col">mark Attendance</th>
    </tr>
  </thead>
  <tbody>
   <?php 
      include "php/elements.php";
      $i=0;
      while ($i<4) {
        manual_attendence();
        $i++;
      }
    ?>
  </tbody>
</table>
<div>
  <button>
    <a href="#" class="form-control btn btn-dark">Submit</a>
  </button>
</div>