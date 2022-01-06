<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Course Name</th>
      <th scope="col">Course Id</th>
      <th scope="col">Select</th>
    </tr>
  </thead>
  <tbody>
   <?php 
      include "php/elements.php";
      $i=0;
      while ($i<4) {
        select_student_subjects();
        $i++;
      }
    ?>
  </tbody>
</table>
<div>
  <button>
    <a href="dashboard?section-id=register-student" class="form-control btn btn-dark">Submit</a>
  </button>
</div>