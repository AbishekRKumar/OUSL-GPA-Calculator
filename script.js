document.getElementById('addCourseButton').addEventListener('click', function() {
    const newCourse = document.createElement('div');
    newCourse.classList.add('course');
    newCourse.innerHTML = `
        <input type="text" name="courseName" placeholder="Course Name" required>
        <input type="number" name="courseCredits" placeholder="Credits" required min="1" step="0.5">
        <select name="courseGrade" required>
            <option value="4">A+</option>
            <option value="4">A</option>
            <option value="3.7">A-</option>
            <option value="3.3">B+</option>
            <option value="3">B</option>
            <option value="2.7">B-</option>
            <option value="2.3">C+</option>
            <option value="2">C</option>
            <option value="1.7">C-</option>
            <option value="1.3">D+</option>
            <option value="1">D</option>
            <option value="0">E</option>
        </select>
    `;
    document.getElementById('coursesContainer').appendChild(newCourse);
});

document.getElementById('gpaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const courseElements = document.getElementsByClassName('course');
    let totalCredits = 0;
    let totalPoints = 0;

    Array.from(courseElements).forEach(course => {
        const credits = parseFloat(course.querySelector('[name="courseCredits"]').value);
        const grade = parseFloat(course.querySelector('[name="courseGrade"]').value);
        totalCredits += credits;
        totalPoints += credits * grade;
    });

    const gpa = totalPoints / totalCredits;
    document.getElementById('gpaValue').innerText = gpa.toFixed(2);
    let gpaClass = 'General Pass';
    if (gpa > 3.7) gpaClass = 'First Class';
    else if (gpa >= 3.3) gpaClass = 'Second Class Upper';
    else if (gpa >= 3.0) gpaClass = 'Second Class Lower';
    document.getElementById('gpaClass').innerText = gpaClass;

    document.getElementById('result').style.display = 'block';
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let content = 'GPA Results\n\n';
    content += `Your GPA: ${document.getElementById('gpaValue').innerText}\n`;
    content += `GPA Class: ${document.getElementById('gpaClass').innerText}\n\n`;
    content += 'Courses:\n';

    const courseElements = document.getElementsByClassName('course');
    Array.from(courseElements).forEach(course => {
        const courseName = course.querySelector('[name="courseName"]').value;
        const credits = course.querySelector('[name="courseCredits"]').value;
        const grade = course.querySelector('[name="courseGrade"]').selectedOptions[0].text;
        content += `${courseName} - ${credits} Credits - Grade: ${grade}\n`;
    });

    doc.text(content, 10, 10);
    doc.save('gpa_result.pdf');
});
