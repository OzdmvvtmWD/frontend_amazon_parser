import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

type Category = {
  id: number;
  name: string;
};

interface SelectorCategoryProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectorCategory({ onChange }: SelectorCategoryProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string>(() => {
    return localStorage.getItem('selectedCategory') || 'ALL';
  });

  useEffect(() => {
    fetch('http://localhost/api/v1/bestsellers-categories/')
      .then(res => res.json())
      .then((data: Category[]) => {
        console.log('Категорії з API:', data);
        setCategories(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    localStorage.setItem('selectedCategory', e.target.value);

    if (onChange) {
      onChange(e); // викликаємо callback з App.tsx
    }
  };

  return (
    <div>
      <Form.Select value={selected} onChange={handleChange}>
        <option value="ALL">All</option> {/* дефолтний вибір */}
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default SelectorCategory;
