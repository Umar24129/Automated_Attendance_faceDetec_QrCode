<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Teacher Name</th>
      <th scope="col">Department</th>
      <th scope="col">Designation</th>
      <th scope="col">Contact</th>
    </tr>
  </thead>
  <tbody>
   <?php 
      include "php/elements.php";
      $i=0;
      while ($i<2) {
        all_teacher_row();
        $i++;
      }
    ?>
  </tbody>
</table>