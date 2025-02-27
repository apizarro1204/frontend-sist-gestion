import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerTareas, obtenerCategorias, actualizarTarea, eliminarTarea, actualizarEstadoTarea } from '../services/api';
import Navbar from '../components/NavBar';
import { crearTarea } from '../services/api';
import { toast, ToastContainer  } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskIdToEdit, setTaskIdToEdit] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [showStateConfirmation, setShowStateConfirmation] = useState(false);
  const [taskIdToChangeState, setTaskIdToChangeState] = useState(null);
  const [newState, setNewState] = useState('');
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
        toast.error('Error al obtener las tareas');
      }
    };

    const fetchCategorias = async () => {
      try {
        const categoriasData = await obtenerCategorias();
        setCategorias(categoriasData);
      } catch (err) {
        console.error('Error al obtener categorías:', err);
        toast.error('Error al obtener las categorías');
      }
    };

    fetchTareas();
    fetchCategorias();
  }, [token, navigate]);

  const openModal = (task = null) => {
    if (task) {
      setIsEditMode(true);
      setTaskIdToEdit(task.id);
      setNuevaTarea({
        titulo: task.titulo,
        descripcion: task.descripcion,
        fechaLimite: formatDate(task.fechaLimite),
        prioridad: task.prioridad,
        categoriaId: task.categoriaId,
        estado: task.estado,
      });
    } else {
      setIsEditMode(false);
      setTaskIdToEdit(null);
    }
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

    const fechaLimiteISO = new Date(nuevaTarea.fechaLimite).toISOString();

    if (!nuevaTarea.titulo || !nuevaTarea.descripcion || !nuevaTarea.fechaLimite || !nuevaTarea.estado || !nuevaTarea.prioridad || !nuevaTarea.categoriaId || !token) {
      console.error('Todos los campos son requeridos');
      toast.error('Todos los campos son requeridos');
      return;
    }

    if (isEditMode) {
      await actualizarTarea(taskIdToEdit, { ...nuevaTarea, fechaLimite: fechaLimiteISO }, token);
      toast.success('Tarea actualizada con éxito');
    } else {
      await crearTarea(nuevaTarea.titulo, nuevaTarea.descripcion, fechaLimiteISO, nuevaTarea.estado, nuevaTarea.prioridad, nuevaTarea.categoriaId, token);
      toast.success('Tarea creada con éxito');
    }

    const tareasData = await obtenerTareas(token);
    setTareas(tareasData);
    setShowModal(false);
  };

  const handleStateChange = async () => {
    try {
      await actualizarEstadoTarea(taskIdToChangeState, newState, token);
      toast.success('Estado de la tarea actualizado');
      const tareasData = await obtenerTareas(token);
      setTareas(tareasData);
      setShowStateConfirmation(false);
    } catch (err) {
      console.error('Error al cambiar el estado de la tarea:', err);
      toast.error('Error al cambiar el estado');
    }
  };

  const openStateConfirmation = (taskId, currentState) => {
    setTaskIdToChangeState(taskId);
    setNewState(currentState === 'Pendiente' ? 'Completada' : 'Pendiente');
    setShowStateConfirmation(true);
  };

  const handleEliminar = (taskId) => {
    setTaskIdToDelete(taskId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await eliminarTarea(taskIdToDelete, token);
      toast.success('Tarea eliminada');
      const tareasData = await obtenerTareas(token);
      setTareas(tareasData);
      setShowDeleteConfirmation(false);
    } catch (err) {
      console.error('Error al eliminar la tarea:', err);
      toast.error('Error al eliminar la tarea');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setTaskIdToDelete(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  

  return (
    <div className="home-container">
      <Navbar nombreUsuario={nombreUsuario} />
      <div className="tasks-container">
        <h2>Tareas</h2>
        <button onClick={() => openModal()}>Crear Nueva Tarea</button>
        <div className="tareas-list">
          {tareas.length === 0 ? (
            <p>No tienes tareas asignadas</p>
          ) : (
            tareas.map((tarea) => (
              <div key={tarea.id} className="tarea-item">
                <p>{tarea.titulo}</p>
                <p>{tarea.descripcion}</p>
                <p>{formatDate(tarea.fechaLimite)}</p>
                <select
                  value={tarea.estado}
                  onChange={(e) => openStateConfirmation(tarea.id, tarea.estado)}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
                <button onClick={() => openModal(tarea)}>Editar</button>
                <button onClick={() => handleEliminar(tarea.id)}>Eliminar</button>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditMode ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
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
              <button type="submit">{isEditMode ? 'Guardar Cambios' : 'Crear Tarea'}</button>
              <button type="button" onClick={closeModal}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h2>¿Estás seguro de eliminar esta tarea?</h2>
            <button onClick={handleConfirmDelete}>Sí, eliminar</button>
            <button onClick={handleCancelDelete}>Cancelar</button>
          </div>
        </div>
      )}

      {showStateConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <h2>¿Estás seguro de cambiar el estado de la tarea a {newState}?</h2>
            <button onClick={handleStateChange}>Sí, cambiar estado</button>
            <button onClick={() => setShowStateConfirmation(false)}>Cancelar</button>
          </div>
        </div>
      )}

    <ToastContainer />
    </div>
  );
};

export default HomePage;
