import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Función para hacer login
export const loginUsuario = async (nombreUsuario, password) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/login`, {
      nombreUsuario,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al hacer login");
  }
};

// Función para registrar un nuevo usuario
export const crearUsuario = async (nombreUsuario, password) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/registrar`, {
      nombreUsuario,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error al crear el usuario");
  }
};

// Función para obtener todas las tareas de un usuario
export const obtenerTareas = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/tareas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error al obtener las tareas"
    );
  }
};

// Función para crear una nueva tarea
export const crearTarea = async (
  titulo,
  descripcion,
  fechaLimite,
  estado,
  prioridad,
  categoriaId,
  token
) => {
  try {
 
    const response = await axios.post(
      `${API_URL}/tareas`,
      {
        titulo,
        descripcion,
        fechaLimite,
        estado,
        prioridad,
        categoriaId: parseInt(categoriaId),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al crear tarea:', error);
    throw new Error(error.response?.data?.error || "Error al crear la tarea");
  }
};

// Función para actualizar el estado de una tarea
export const actualizarEstadoTarea = async (id, nuevoEstado, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/tareas/${id}`,
      {
        estado: nuevoEstado,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error al actualizar el estado de la tarea"
    );
  }
};

// Función para actualizar los detalles de una tarea
export const actualizarTarea = async (id, nuevaTarea, token) => {
    try {
  
      const response = await axios.put(`${API_URL}/tareas/${id}`, { 
        titulo: nuevaTarea.titulo, 
        descripcion: nuevaTarea.descripcion, 
        fechaLimite: nuevaTarea.fechaLimite, 
        prioridad: nuevaTarea.prioridad,
        categoriaId: nuevaTarea.categoriaId,
        estado: nuevaTarea.estado,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      throw new Error(error.response?.data?.error || 'Error al actualizar la tarea');
    }
  };

  
// Función para eliminar una tarea
export const eliminarTarea = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/tareas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error al eliminar la tarea"
    );
  }
};

// Función para obtener las categorías
export const obtenerCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error al obtener categorías"
    );
  }
};
