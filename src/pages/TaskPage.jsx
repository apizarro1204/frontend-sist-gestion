import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerTareas, obtenerCategorias, crearTarea } from '../services/api';
import Navbar from '../components/NavBar';

const TareasPage = () => {
  const [tareas, setTareas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    descripcion: '',
    fechaLimite: '',
    prioridad: 'Alta',
    categoriaId: '',
    estado: 'Pendiente',
  });
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');
  const nombreUsuario = token ? JSON.parse(atob(token.split('.')[1])).nombreUsuario : '';

  useEffect(() => {
    if (!token) {
      navigate('/');
    }

    const fetchTareas = async () => {
      try {
        const tareasData = await obtenerTareas(token);
        setTareas(tareasData);
      } catch (err) {
        console.error('Error al obtener tareas:', err);
      }
    };

    const fetchCategorias = async () => {
      try {
        const categoriasData = await obtenerCategorias();
        setCategorias(categoriasData);
      } catch (err) {
        console.error('Error al obtener categorías:', err);
      }
    };

    fetchTareas();
    fetchCategorias();
  }, [token, navigate]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNuevaTarea({
      titulo: '',
      descripcion: '',
      fechaLimite: '',
      prioridad: 'Alta',
      categoriaId: '',
      estado: 'Pendiente',
    });
  };

  const handleChange = (e) => {
    setNuevaTarea({
      ...nuevaTarea,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearTarea(nuevaTarea.titulo, nuevaTarea.descripcion, nuevaTarea.fechaLimite, nuevaTarea.prioridad, nuevaTarea.categoriaId, token);
      setShowModal(false);
      const tareasData = await obtenerTareas(token);
      setTareas(tareasData);
    } catch (err) {
      console.error('Error al crear tarea:', err);
    }
  };

  return (
    <div className="home-container">
      <Navbar nombreUsuario={nombreUsuario} />
      <div className="tasks-container">
        <h2>Tareas</h2>
        <button onClick={openModal}>Crear Nueva Tarea</button>
        <div className="tareas-list">
          {tareas.length === 0 ? (
            <p>No tienes tareas asignadas</p>
          ) : (
            tareas.map((tarea) => (
              <div key={tarea.id} className="tarea-item">
                <p>{tarea.titulo}</p>
                <p>{tarea.descripcion}</p>
                <p>{tarea.fechaLimite}</p>
                <select
                  value={tarea.estado}
                  onChange={(e) => handleEditarEstado(tarea.id, e.target.value)}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
                <button onClick={() => handleEditarTarea(tarea.id)}>Editar</button>
                <button onClick={() => handleEliminar(tarea.id)}>Eliminar</button>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Crear Nueva Tarea</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={nuevaTarea.titulo}
                onChange={handleChange}
                required
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={nuevaTarea.descripcion}
                onChange={handleChange}
                required
              />
              <input
                type="datetime-local"
                name="fechaLimite"
                value={nuevaTarea.fechaLimite}
                onChange={handleChange}
                required
              />
              <select
                name="prioridad"
                value={nuevaTarea.prioridad}
                onChange={handleChange}
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
              <select
                name="categoriaId"
                value={nuevaTarea.categoriaId}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              <select
                name="estado"
                value={nuevaTarea.estado}
                onChange={handleChange}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
              <button type="submit">Crear Tarea</button>
              <button type="button" onClick={closeModal}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TareasPage;
