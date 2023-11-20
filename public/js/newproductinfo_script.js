



function handleFileUpload() {
    // Trigger click on hidden file input
    document.getElementById('fileInput').click();

    // Listen for file input change
    document.getElementById('fileInput').addEventListener('change', function() {
        // Get the selected file
        const file = this.files[0];

        // Do something with the file (e.g., upload it)
        if (file) {
            uploadFile(file);
        }
    });
}

function uploadFile(file) {
    // You can implement your file upload logic here
    console.log('Uploading file:', file.name);
    // Add your code to handle the file upload, e.g., using AJAX or FormData
    // Example:
    // const formData = new FormData();
    // formData.append('file', file);
    // Use AJAX or another method to send the formData to the server
}