document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const imageFile = document.getElementById('imageInput').files[0];
    const formData = new FormData();
    formData.append('image', imageFile);

    // Mengirim gambar ke server untuk diproses
    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });
    console.log('response', response);

    const result = await response.json();
    document.getElementById('result').innerText = result.answer;
});