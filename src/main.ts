interface Student {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  birthdate: string;
  job: string;
  position: string;
  married: boolean;
}

//! Load students from localStorage
const students: Student[] = JSON.parse(localStorage.getItem('students') || '[]');

//! Render the student list
function renderStudentList() {
  const studentList = document.getElementById('studentList');
  studentList.innerHTML = students.map((student) => `
    <div class="card mb-3">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div class="d-flex flex-wrap align-items-center">
          <div class="mr-4">
            <h5 class="card-title text-info">${student.firstName} ${student.lastName}</h5>
          </div>
          <div class="d-flex flex-wrap align-items-center">
            <p class="card-text mr-4"><span class="font-weight-bold">Address:</span> ${student.address}</p>
            <p class="card-text mr-4"><span class="font-weight-bold">Birthdate:</span> ${student.birthdate}</p>
            <p class="card-text mr-4"><span class="font-weight-bold">Job:</span> ${student.job}</p>
            <p class="card-text mr-4"><span class="font-weight-bold">Position:</span> ${student.position}</p>
            <p class="card-text"><span class="font-weight-bold">Married:</span> ${student.married ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div class="d-flex">
          <button class="btn btn-primary mr-2" onclick="editStudent('${student.id}')">Edit</button>
          <button class="btn btn-danger" onclick="deleteStudent('${student.id}')">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

//! Add a new student
const addStudentForm = document.getElementById('addStudentForm');
const saveStudentButton = document.getElementById('saveStudent');

saveStudentButton.addEventListener('click', () => {
  const firstName = document.getElementById('firstName') as HTMLInputElement;
  const lastName = document.getElementById('lastName') as HTMLInputElement;
  const address = document.getElementById('address') as HTMLInputElement;
  const birthdate = document.getElementById('birthdate') as HTMLInputElement;
  const job = document.getElementById('job') as HTMLSelectElement;
  const position = document.getElementById('position') as HTMLSelectElement;
  const married = document.getElementById('married') as HTMLInputElement;

  const newStudent: Student = {
    id: crypto.randomUUID(),
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    birthdate: birthdate.value,
    job: job.value,
    position: position.value,
    married: married.checked,
  };

  students.push(newStudent);
  localStorage.setItem('students', JSON.stringify(students));
  renderStudentList();
  addStudentForm.reset();
  const addStudentModal = document.getElementById('addStudentModal');
  const modal = bootstrap.Modal.getInstance(addStudentModal);
  modal.hide();
});

//! Edit a student
const editStudentForm = document.getElementById('editStudentForm');
const updateStudentButton = document.getElementById('updateStudent');

function editStudent(id: string) {
  const student = students.find((s) => s.id === id);
  if (student) {
    (document.getElementById('editFirstName') as HTMLInputElement).value = student.firstName;
    (document.getElementById('editLastName') as HTMLInputElement).value = student.lastName;
    (document.getElementById('editAddress') as HTMLInputElement).value = student.address;
    (document.getElementById('editBirthdate') as HTMLInputElement).value = student.birthdate;
    (document.getElementById('editJob') as HTMLSelectElement).value = student.job;
    (document.getElementById('editPosition') as HTMLSelectElement).value = student.position;
    (document.getElementById('editMarried') as HTMLInputElement).checked = student.married;

    const editStudentModal = document.getElementById('editStudentModal');
    const modal = new bootstrap.Modal(editStudentModal);
    modal.show();

    updateStudentButton.addEventListener('click', () => {
      student.firstName = (document.getElementById('editFirstName') as HTMLInputElement).value;
      student.lastName = (document.getElementById('editLastName') as HTMLInputElement).value;
      student.address = (document.getElementById('editAddress') as HTMLInputElement).value;
      student.birthdate = (document.getElementById('editBirthdate') as HTMLInputElement).value;
      student.job = (document.getElementById('editJob') as HTMLSelectElement).value;
      student.position = (document.getElementById('editPosition') as HTMLSelectElement).value;
      student.married = (document.getElementById('editMarried') as HTMLInputElement).checked;

      localStorage.setItem('students', JSON.stringify(students));
      renderStudentList();
      modal.hide();
    });
  }
}

//! Delete a student
function deleteStudent(id: string) {
  const index = students.findIndex((s) => s.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudentList();
  }
}

//! Initial render of the student list
renderStudentList();