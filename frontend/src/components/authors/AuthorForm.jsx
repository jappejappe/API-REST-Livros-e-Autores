import React, { useState, useEffect } from 'react';
import { authorService } from '../../services/authorService';

const AuthorForm = ({ author, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    biography: '',
    birthYear: '',
    nationality: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name || '',
        biography: author.biography || '',
        birthYear: author.birthYear || '',
        nationality: author.nationality || ''
      });
    }
  }, [author]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (formData.birthYear) {
      const year = parseInt(formData.birthYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1000 || year > currentYear) {
        newErrors.birthYear = 'Ano deve ser válido';
      }
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      let response;
      if (author) {
        response = await authorService.updateAuthor(author.id, formData);
      } else {
        response = await authorService.createAuthor(formData);
      }
      
      if (response.success) {
        onSave(response.data);
      }
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.error?.details) {
        const newErrors = {};
        errorData.error.details.forEach(detail => {
          if (detail.includes('Nome')) newErrors.name = detail;
          else if (detail.includes('Ano')) newErrors.birthYear = detail;
          else newErrors.general = detail;
        });
        setErrors(newErrors);
      } else {
        setErrors({ general: 'Erro ao salvar autor. Tente novamente.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>{author ? 'Editar Autor' : 'Cadastrar Novo Autor'}</h2>
      
      {errors.general && (
        <div style={{ color: 'red', marginBottom: '16px', padding: '8px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome do Autor *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome completo do autor"
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="biography">Biografia</label>
          <textarea
            id="biography"
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            placeholder="Conte um pouco sobre o autor"
            rows="4"
            style={{ resize: 'vertical' }}
          />
          {errors.biography && <div className="error">{errors.biography}</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label htmlFor="birthYear">Ano de Nascimento</label>
            <input
              type="number"
              id="birthYear"
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              placeholder="Ex: 1975"
              min="1000"
              max={new Date().getFullYear()}
            />
            {errors.birthYear && <div className="error">{errors.birthYear}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="nationality">Nacionalidade</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="Ex: Brasileiro"
            />
            {errors.nationality && <div className="error">{errors.nationality}</div>}
          </div>
        </div>



        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Salvando...' : (author ? 'Atualizar' : 'Cadastrar')}
          </button>
          <button 
            type="button" 
            className="btn"
            onClick={onCancel}
            style={{ backgroundColor: '#6c757d', color: 'white' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;