import { useEffect, useState } from "react";
import { api } from "./api";
import ArticleDetail from "./ArticleDetail";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get("/articles").then(res => setArticles(res.data));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>BeyondChats Blog Articles</h1>

      <ul>
        {articles.map(article => (
          <li key={article._id}>
            <button onClick={() => setSelected(article)}>
              {article.title}
            </button>
            {article.isUpdated && <span>(Updated)</span>}
          </li>
        ))}
      </ul>

      {selected && <ArticleDetail article={selected} />}
    </div>
  );
}
