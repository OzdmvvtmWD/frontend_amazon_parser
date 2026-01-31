import { useEffect, useState } from 'react';
import SelectorCategory from './components/selectors/SelectorCategory';
import GridLayout from './components/grids/Grid';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url =
      selectedCategory === 'ALL'
        ? 'http://localhost/api/v1/amazon/'
        : `http://localhost/api/v1/amazon/category-products/?category=${selectedCategory}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <>
      <SelectorCategory onChange={(e) => setSelectedCategory(e.target.value)} />
      <GridLayout products={products} loading={loading} />
    </>
  );
}

export default App;
