async function homeHandler(request, h) {
    // Dalam implementasi yang sebenarnya, Anda mungkin akan memuat data dinamis
    // atau melakukan operasi lain sebelum mengembalikan respons HTML.
    const htmlResponse = `
        <h1>API</h1>
        <h2>Base URL</h2>
        <ul>
            <li><a href="https://capstone-bangkit-424311.et.r.appspot.com/">https://capstone-bangkit-424311.et.r.appspot.com/</a></li>
        </ul>

        <h2>Endpoints</h2>
        <h3>List PATH</h3>
        <ul>
            <li>
                <p>URL: /stories</p>
                <p>Method: GET</p>
                <p>Response:</p>
                <pre>
                    [
                        {
                            "title": "Jack and the Hidden Boys",
                            "difficulty": "Normal",
                            "id": "story1"
                        },
                        {
                            "title": "Lily's Adventure",
                            "difficulty": "Normal",
                            "id": "story2"
                        },
                        {
                            "title": "Andy’s Holiday!",
                            "difficulty": "Hard",
                            "id": "story3"
                        },
                        {
                            "title": "The Turtle and The Rabbit",
                            "difficulty": "Normal",
                            "id": "story4"
                        }
                    ]
                </pre>
            </li>
        </ul>

        <h3>GET story</h3>
        <ul>
            <li>
                <p>URL: /stories/story{id}</p>
                <p>Method: GET</p>
                <p>Response:</p>
                <pre>
                    {
                        "story1": "Ada seorang anak laki-laki bernama Fajar yang suka berpetualang. Suatu pagi yang cerah, Fajar mengambil sebuah <span style='color:red'>(apel)</span> dari meja dapur dan berangkat untuk berpetualang."
                    },
                    {
                        "story2": "Pada suatu hari yang cerah di kaki sebuah <span style='color:red'>(gunung)</span> yang tinggi, hiduplah seorang gadis bernama Lili."
                    },
                    {
                         "story3": "Adi, seorang anak laki-laki, mengemas <span style='color:red'>(koper)</span> untuk liburan yang menyenangkan."
                    },
                    {
                        "story4": "Di sebuah hutan, hiduplah seekor <span style='color:red'>(kelinci)</span> putih yang sangat menyukai wortel."
                    }
                </pre>
            </li>
        </ul>

        <h3>POST story</h3>
        <ul>
            <li>
                <p>URL: /stories/story1</p>
                <p>Method: POST</p>
                <p>Steps: body - raw</p>
                <p>Test:</p>
                <pre>
                    {
                        "text": "apel"
                    }
                </pre>
                <p>Response Test:</p>
                <pre>
                    {
                        "status": "success",
                        "message": "Text is processed successfully.",
                        "data": {
                            "id": "478ec769-1227-483b-843d-6da85593d2dd",
                            "hasil gambar": "apple1",
                            "cerita": "Fajar mengenakan <span style='color:red'>(kaos)</span> favoritnya, saat dia menjelajahi hutan.",
                            "createdAt": "2024-06-18T18:32:35.837Z"
                        }
                    }
                </pre>
            </li>
        </ul>
    `;

    return h.response(htmlResponse).code(200); // Mengembalikan respons HTTP dengan konten HTML
}

module.exports = homeHandler;
