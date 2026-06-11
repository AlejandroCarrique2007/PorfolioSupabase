import { useEffect, useState, type FormEvent } from 'react';
import { getFormacion, insertFormacion, deleteFormacion, updateFormacion } from '../../Model/api/main/apiformacion';
import type { IFormacionRegistro } from '../../Model/interfaces/IFormacionRegistro';

export default function AdminFormacion() {
  const [formaciones, setFormaciones] = useState<IFormacionRegistro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [horas, setHoras] = useState('');
  const [estado, setEstado] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const loadFormaciones = async () => {
    try {
      setLoading(true);
      const data = await getFormacion();
      setFormaciones(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando las formaciones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFormaciones();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);

    const payload = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || null,
      categoria: categoria.trim() || null,
      plataforma: plataforma.trim() || null,
      horas: horas ? Number(horas) : null,
      estado: estado.trim() || null,
      calificacion: calificacion ? Number(calificacion) : null,
      imagen_url: imagenUrl.trim() || null,
    };

    try {
      if (editingId !== null) {
        // Modo edición: actualizar
        const { data, error: updateError } = await updateFormacion(editingId, payload);
        if (updateError) {
          setError(updateError.message);
          return;
        }

        setSuccess('Formación actualizada correctamente.');
        setFormaciones((prev) =>
          prev.map((item) => (item.id === editingId && data && data.length > 0 ? data[0] : item))
        );
        handleCancelEdit();
      } else {
        // Modo inserción: crear nueva
        const { data, error: insertError } = await insertFormacion(payload);
        if (insertError) {
          setError(insertError.message);
          return;
        }

        setSuccess('Formación añadida correctamente.');
        setNombre('');
        setDescripcion('');
        setCategoria('');
        setPlataforma('');
        setHoras('');
        setEstado('');
        setCalificacion('');
        setImagenUrl('');

        if (data && data.length > 0) {
          setFormaciones((prev) => [data[0], ...prev]);
        } else {
          await loadFormaciones();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (formacion: IFormacionRegistro) => {
    setEditingId(formacion.id);
    setNombre(formacion.nombre);
    setDescripcion(formacion.descripcion || '');
    setCategoria(formacion.categoria || '');
    setPlataforma(formacion.plataforma || '');
    setHoras(formacion.horas ? String(formacion.horas) : '');
    setEstado(formacion.estado || '');
    setCalificacion(formacion.calificacion ? String(formacion.calificacion) : '');
    setImagenUrl(formacion.imagen_url || '');
    setIsFormOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNombre('');
    setDescripcion('');
    setCategoria('');
    setPlataforma('');
    setHoras('');
    setEstado('');
    setCalificacion('');
    setImagenUrl('');
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('¿Eliminar esta formación de Supabase?');
    if (!confirmed) return;

    try {
      const { error: deleteError } = await deleteFormacion(id);
      if (deleteError) {
        setError(deleteError.message);
        return;
      }
      setFormaciones((prev) => prev.filter((item) => item.id !== id));
      setSuccess('Formación eliminada correctamente.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error eliminando la formación.');
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Formación</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Gestión de formaciones</h2>
            <p className="mt-3 text-slate-600">
              Agrega nuevas formaciones y revisa las entradas existentes directamente desde Supabase.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {isFormOpen ? 'Ocultar formulario' : 'Mostrar formulario'}
          </button>
        </div>
      </section>

      {isFormOpen && (
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-900">{editingId ? 'Editar formación' : 'Añadir formación'}</h3>
          <p className="mt-2 text-slate-600">
            {editingId ? 'Modifica los datos de la formación.' : 'Rellena el formulario y pulsa guardar para añadir la formación a Supabase.'}
          </p>

          {success && <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">{success}</div>}
          {error && <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

          <form className="mt-6 grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="grid gap-2 text-slate-700">
                <span className="text-sm font-medium">Nombre</span>
                <input
                  type="text"
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                  required
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="Nombre de la formación"
                />
              </label>
              <label className="grid gap-2 text-slate-700">
                <span className="text-sm font-medium">Categoría</span>
                <input
                  type="text"
                  value={categoria}
                  onChange={(event) => setCategoria(event.target.value)}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="Categoría"
                />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="grid gap-2 text-slate-700">
                <span className="text-sm font-medium">Plataforma</span>
                <input
                  type="text"
                  value={plataforma}
                  onChange={(event) => setPlataforma(event.target.value)}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="Ej. Coursera, Udemy"
                />
              </label>
              <label className="grid gap-2 text-slate-700">
                <span className="text-sm font-medium">Horas</span>
                <input
                  type="number"
                  value={horas}
                  onChange={(event) => setHoras(event.target.value)}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="Número de horas"
                />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="grid gap-2 text-slate-700">
                <span className="text-sm font-medium">Estado</span>
                <input
                  type="text"
                  value={estado}
                  onChange={(event) => setEstado(event.target.value)}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="Completado, En progreso..."
                />
              </label>
              <label className="grid gap-2 text-slate-700">
                <span className="text-sm font-medium">Calificación</span>
                <input
                  type="number"
                  value={calificacion}
                  onChange={(event) => setCalificacion(event.target.value)}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="0-10"
                />
              </label>
            </div>

            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">Descripción</span>
              <textarea
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
                rows={4}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Descripción de la formación"
              />
            </label>

            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">URL de imagen</span>
              <input
                type="url"
                value={imagenUrl}
                onChange={(event) => setImagenUrl(event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="https://..."
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {saving ? (editingId ? 'Actualizando...' : 'Guardando...') : (editingId ? 'Actualizar formación' : 'Guardar formación')}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-300"
              >
                Cancelar edición
              </button>
            )}
          </form>
        </section>
      )}

      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Formaciones</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Listado de formaciones</h2>
            <p className="mt-3 text-slate-600">Aquí aparecen las formaciones guardadas en Supabase.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            {loading ? 'Cargando...' : `${formaciones.length} registros`}
          </span>
        </div>

        {loading ? (
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">Cargando formaciones...</div>
        ) : error ? (
          <div className="mt-8 rounded-[28px] border border-red-200 bg-red-50 p-8 text-red-700">{error}</div>
        ) : formaciones.length === 0 ? (
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">No hay formaciones guardadas.</div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {formaciones.map((formacion) => (
              <article key={formacion.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{formacion.nombre}</h3>
                    <p className="mt-1 text-sm text-slate-500">{formacion.categoria || 'Sin categoría'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void handleEdit(formacion)}
                      className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(formacion.id)}
                      className="rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">{formacion.descripcion || 'Sin descripción'}</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Plataforma</span>
                    <p className="mt-1 text-sm text-slate-700">{formacion.plataforma || 'No indicado'}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Horas</span>
                    <p className="mt-1 text-sm text-slate-700">{formacion.horas ?? 'N/A'}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Estado</span>
                    <p className="mt-1 text-sm text-slate-700">{formacion.estado || 'Sin estado'}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Creado</span>
                    <p className="mt-1 text-sm text-slate-700">{formacion.created_at ? new Date(formacion.created_at).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
