document.getElementById('newsForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const content = document.getElementById('content').value;
  const images = document.getElementById('images').value.split(',').map(img => img.trim());

  const newItem = { title, date, content, images };

  try {
    const res = await fetch('data/news.json');
    const data = await res.json();

    data.unshift(newItem); // додаємо в початок

    // ⚠️ Це не працює без backend API!
    await fetch('data/news.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data, null, 2)
    });

    document.getElementById('successMessage').style.display = 'block';
    this.reset();
  } catch (err) {
    alert('⚠️ Помилка: для запису використовуйте Live Server або хостинг з backend API.');
  }
});
