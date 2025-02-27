import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearTarea, obtenerCategorias } from '../services/api';

const CrearTareaPage = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [prioridad, setPrioridad] = useState('Alta');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await obtenerCategorias();
        console.log(categoriasData);
        setCategorias(categoriasData);
      } catch (err) {
        console.error('Error al obtener categorías:', err);
      }
    };

    fetchCategorias();
  }, []);

  const handleCrearTarea = async (e) => {
    e.preventDefault();

    try {
      await crearTarea(titulo, descripcion, fechaLimite, prioridad, categoriaId, token);
      navigate('/home');
    } catch (err) {
      console.error('Error al crear la tarea:', err);
    }
  };

  return (
    <div className="crear-tarea-container">
      <h2>Crear Nueva Tarea</h2>
      <form onSubmit={handleCrearTarea}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="datetime-local"
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
        />
        <select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
        >
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Crear Tarea</button>
      </form>
    </div>
  );
};

export default CrearTareaPage;
