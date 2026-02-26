import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../components/Navbar';
import { fetchProductById } from '../tools/api';

const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
  max-width: 1200px;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 40px 20px;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 50px;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    gap: 60px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  max-width: 400px;
  padding: 10px;
  border: 1px solid #800020;
  border-radius: 8px;
  align-self: flex-start;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 450px;
  }
`;

const ProductImage = styled.img`
 width: 100%;
 max-height: 400px;
 border-radius: 8px;
 object-fit: cover;
 object-position: center;
 background-color: #f5f5f5;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.xlarge};
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: ${props => props.theme.fontSizes.large};
  font-weight: bold;
  margin: 20px 0;
`;

const Category = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin: 10px 0;
`;

const InterestButton = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  margin: 0 auto;
  margin-top: 80px;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

// styling for the interest form
const Form = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  width: 100%;
  min-height: 120px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: ${props => props.theme.fontSizes.medium};
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
  
  &:hover { opacity: 0.9; }
`;


export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); 
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
   name: '',
   email: '',
   phone: '',
   message: ''
  })
  const [submitted, setSubmitted] = useState(false);
  ;

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };

       getProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

 const handleSubmit = async () => {
  try {
    await fetch('http://localhost:5000/api/interests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id, ...formData })
    });
    setShowForm(false);
    setSubmitted(true);
  } catch (error) {
    alert('Oups something went wrong, try again!');
  }
};


  return (
    <>
    <Navbar />
    <Container>
      <DetailContainer>
         <ImageSection>
          <ProductImage src={product.image} alt={product.title} />
        </ImageSection>
      
      <InfoSection>
      <Title>{product.title}</Title>
      <Category 
       onClick={() => navigate(`/gallery/${product.creator._id}`)}
       style={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
  {product.creator.name}
</Category>
<Category>{product.category}</Category>
      <Price>{product.price} kr</Price>

    {product.forSale && (
  <>
    <p>Contact the artist if interested in item</p>
    <InterestButton onClick={() => setShowForm(!showForm)}>
      {showForm ? 'Hide form' : 'Connect with the artist'}
    </InterestButton>
    {submitted && (
  <p style={{ marginTop: '16px', color: '#460202' }}>
    Your message has been sent to the artist!
  </p>
)}

    {showForm && (
      <Form>
        <Input 
        type="text" 
        name="name" 
        placeholder="Your name" 
        value={formData.name} 
        onChange={handleChange} 
        />
        <Input 
        type="email" 
        name="email" 
        placeholder="Your email" 
        value={formData.email} 
        onChange={handleChange} 
        />
        <Input
         type="tel" 
         name="phone" 
         placeholder="Phone number (optional)" 
         value={formData.phone} 
         onChange={handleChange} 
         />
        <Textarea 
        name="message" 
        placeholder="Your message..." 
        value={formData.message} 
        onChange={handleChange} 
        />
        <SubmitButton onClick={handleSubmit}>Send</SubmitButton>
      </Form>
    )}
  </>
)}
      </InfoSection>
      </DetailContainer>
    </Container>
    </>
  );
};