import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  margin-bottom: 30px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-family: ${props => props.theme.fonts.body};
  font-weight: bold;
  margin-bottom: 4px;
  display: block;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  width: 100%;
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  width: 100%;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SaveButton = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
  margin-top: 10px;

  &:hover { opacity: 0.9; }
`;

const CurrentImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    forSale: false,
    color: '',
  });
  const [currentImage, setCurrentImage] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      if (data.success) {
        const p = data.response;
        setFormData({
          title: p.title,
          category: p.category,
          price: p.price,
          forSale: p.forSale,
          color: p.color || '',
        });
        setCurrentImage(p.image);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('forSale', formData.forSale);
    data.append('color', formData.color);
    if (image) data.append('image', image);

    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      body: data
    });

    const result = await response.json();
    if (result.success) navigate('/dashboard');
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>Edit item</Title>
        <Form>
          <div>
            <Label>Current image</Label>
            {currentImage && <CurrentImage src={currentImage} alt="Current" />}
            <Label>Change image</Label>
            <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div>
            <Label>Title</Label>
            <Input type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div>
            <Label>Category</Label>
            <Select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select category</option>
              <option value="Ceramics">Ceramics</option>
              <option value="Textile">Textile</option>
              <option value="Wood">Wood</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Art">Art</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <div>
            <Label>Color</Label>
            <Select name="color" value={formData.color} onChange={handleChange}>
              <option value="">Select color</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Brown">Brown</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Yellow">Yellow</option>
              <option value="Pink">Pink</option>
              <option value="Purple">Purple</option>
              <option value="Orange">Orange</option>
              <option value="Grey">Grey</option>
              <option value="Multicolor">Multicolor</option>
            </Select>
          </div>
          <div>
            <Label>Price (kr)</Label>
            <Input type="number" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <CheckboxWrapper>
            <input type="checkbox" name="forSale" checked={formData.forSale} onChange={handleChange} />
            <Label>For sale</Label>
          </CheckboxWrapper>
          <SaveButton onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </SaveButton>
        </Form>
      </Container>
    </>
  );
};