describe('Team CRUD Tests', () => {
    let createdUserId = null; // Variable to store the created user ID
  
    const apiUrl = 'http://localhost:5000/api/team'; // Ganti dengan URL API Anda
  
    // Create - Test untuk menambahkan anggota tim
    it('should create a new team member', () => {
      const newMember = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'developer',
        profile_picture: null,
        phone: '1234567890',
        address: '1234 Elm Street',
        department: 'Engineering',
        job_title: 'Software Engineer',
        bio: 'Passionate about coding and solving problems.',
      };
  
      return cy.request('POST', apiUrl, newMember).then((response) => {
        cy.wrap(response.status).should('eq', 201); // Corrected assertion
        cy.wrap(response.body.message).should('eq', 'Team member created successfully'); // Corrected assertion
        createdUserId = response.body.id; // Store the ID of the created user for further testing
      });
    });
  
    // Read - Test untuk mengambil data anggota tim yang baru dibuat
    it('should retrieve the newly created team member', () => {
      cy.request('GET', `${apiUrl}/${createdUserId}`).then((response) => {
        cy.wrap(response.status).should('eq', 200); // Corrected assertion
        cy.wrap(response.body.id).should('eq', createdUserId); // Corrected assertion
        cy.wrap(response.body.name).should('eq', 'John Doe'); // Corrected assertion
        cy.wrap(response.body.email).should('eq', 'john.doe@example.com'); // Corrected assertion
      });
    });
  
    // Update - Test untuk memperbarui anggota tim
    it('should update the team member details', () => {
      const updatedMember = {
        name: 'Johnathan Doe',
        email: 'john.doe@example.com',
        role: 'senior developer',
        profile_picture: null,
        phone: '0987654321',
        address: '5678 Oak Street',
        department: 'Engineering',
        job_title: 'Senior Software Engineer',
        bio: 'Experienced developer with a passion for coding.',
      };
  
      return cy.request('PUT', `${apiUrl}/${createdUserId}`, updatedMember).then((response) => {
        cy.wrap(response.status).should('eq', 200); // Corrected assertion
        cy.wrap(response.body.message).should('eq', 'Team member updated successfully'); // Corrected assertion
      });
    });
  
    // Delete - Test untuk menghapus anggota tim
    it('should delete the team member', () => {
      return cy.request('DELETE', `${apiUrl}/${createdUserId}`).then((response) => {
        cy.wrap(response.status).should('eq', 200); // Corrected assertion
        cy.wrap(response.body.message).should('eq', 'Team member deleted successfully'); // Corrected assertion
      });
    });
  });
  