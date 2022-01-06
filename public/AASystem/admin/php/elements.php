<?php 
	function all_course_row(){
		$course_row="
		 <tr>
	      <th scope=\"row\">1</th>
	      <td>Mark</td>
	      <td>Otto</td>
	      <td>@mdo</td>
	    </tr>
	";
	echo $course_row;
	}

	function all_teacher_row(){
		$teacher_row="
		 <tr>
	      <th scope=\"row\">1</th>
	      <td>Naveed Ijaz</td>
	      <td>CS</td>
	      <td>Senior Professor</td>
	      <td>1234567</td>
	    </tr>
	";
	echo $teacher_row;
	}
	function t_all_courses_row(){
		$course_row="
		 <tr>
	      <th scope=\"row\">1</th>
	      <td>Mark</td>
	      <td>Otto</td>
	      <td>@mdo</td>
	    </tr>
	";
	echo $course_row;
	}
	function manual_attendence(){
		$course_row="
		 <tr>
	      <th scope=\"row\">1</th>
	      <td>shahzaib</td>
	      <td>24414</td>
	      <td><label><input type='radio' id='regular' name='optradio'>A</label>
	      	  <label><input type='radio' id='regular' name='optradio'>P</label>
	      </td>
	    </tr>
	";
	echo $course_row;
	}
	function student_list(){
		$course_row="
		 <tr>
	      <th scope=\"row\">1</th>
	      <td>Rasheed</td>
	      <td>24324</td>
	    </tr>
	";
	echo $course_row;
	}
	function select_student_subjects()
	{
		$course_row="
		 <tr>
	      <th scope=\"row\">1</th>
	      <td>Data Science</td>
	      <td>ds101</td>
	      <td><label><input type='checkbox' id='student_course' name='optradio'>Select</label>
	      </td>
	    </tr>
	";
	echo $course_row;
	}
 ?>