<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Course Name</th>
      <th scope="col">Course Code</th>
      <th scope="col">Assigned To</th>
    </tr>
  </thead>
  <tbody>
   <?php 
      include "php/elements.php";
      $i=0;
      while ($i<4) {
        all_course_row();
        $i++;
      }
    ?>
  </tbody>
</table>