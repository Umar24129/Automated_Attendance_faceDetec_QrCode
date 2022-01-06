<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Student Name</th>
      <th scope="col">ID</th>
    </tr>
  </thead>
  <tbody>
   <?php 
      include "php/elements.php";
      $i=0;
      while ($i<4) {
       student_list();
        $i++;
      }
    ?>
  </tbody>
</table>