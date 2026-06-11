import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../../Model/utils/supabase';

interface ServicioAdmin {
  id: number;
  servicio: string;
  descripcion: string;
  detalles: string[];
}

export default function AdminServicios() {
  const [servicios, setServicios] = useState<ServicioAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [servicio, setServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [detalles, setDetalles] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchServicios = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('Servicios')
        .select('*')
        .order('id', { ascending: true });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setServicios(data || []);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchServicios();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);

    const payload = {
      servicio: servicio.trim(),
      descripcion: descripcion.trim(),
      detalles: detalles
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (editingId !== null) {
        // Modo edición
        const { data, error: updateError } = await supabase
          .from('Servicios')
          .update(payload)
          .eq('id', editingId)
          .select();
        
        if (updateError) {
          setError(updateError.message);
          return;
        }

        setSuccess('Servicio actualizado correctamente.');
        setServicios((prev) =>
          prev.map((item) => (item.id === editingId && data && data.length > 0 ? data[0] : item))
        );
        handleCancelEdit();
      } else {
        // Modo inserción
        const { data, error: insertError } = await supabase.from('Servicios').insert([payload]).select();
        if (insertError) {
          setError(insertError.message);
          return;
        }

        const created = data?.[0] as ServicioAdmin | undefined;
        if (created) {
          setServicios((prev) => [created, ...prev]);
        } else {
          await fetchServicios();
        }

        setSuccess('Servicio insertado correctamente en Supabase.');
        setServicio('');
        setDescripcion('');
        setDetalles('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: ServicioAdmin) => {
    setEditingId(item.id);
    setServicio(item.servicio);
    setDescripcion(item.descripcion);
    setDetalles(item.detalles.join(', '));
    setIsFormOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setServicio('');
    setDescripcion('');
    setDetalles('');
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('¿Eliminar este servicio de Supabase?');
    if (!confirmed) return;

    try {
      const { error: deleteError } = await supabase.from('Servicios').delete().eq('id', id);
      if (deleteError) {
        setError(deleteError.message);
        return;
      }
      setServicios((prev) => prev.filter((item) => item.id !== id));
      setSuccess('Servicio eliminado correctamente.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error eliminando el servicio.');
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Servicios</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Gestión de servicios</h2>
            <p className="mt-3 text-slate-600">Añade nuevos servicios y revisa los existentes directamente en Supabase.</p>
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
          <h3 className="text-2xl font-semibold text-slate-900">{editingId ? 'Editar servicio' : 'Agregar servicio'}</h3>
          <p className="mt-2 text-slate-600">{editingId ? 'Modifica los datos del servicio.' : 'Rellena los datos y guarda para que aparezca en la lista.'}</p>

          {success && <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">{success}</div>}
          {error && <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

          <form className="mt-6 grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="grid gap-2 text-slate-700">
                <span className="text-sm font-medium">Nombre del servicio</span>
                <input
                  type="text"
                  value={servicio}
                  onChange={(event) => setServicio(event.target.value)}
                  required
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="Diseño web, SEO, soporte"
                />
              </label>
              <label className="grid gap-2 text-slate-700">
                <span className="text-sm font-medium">Descripción</span>
                <input
                  type="text"
                  value={descripcion}
                  onChange={(event) => setDescripcion(event.target.value)}
                  required
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="Descripción breve"
                />
              </label>
            </div>

            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">Detalles</span>
              <input
                type="text"
                value={detalles}
                onChange={(event) => setDetalles(event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Ej: UX, mantenimiento, asesoría"
              />
              <span className="text-xs text-slate-500">Separados por coma</span>
            </label>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {saving ? (editingId ? 'Actualizando...' : 'Guardando...') : (editingId ? 'Actualizar servicio' : 'Guardar servicio')}
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
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Servicios</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Listado de servicios</h2>
            <p className="mt-3 text-slate-600">Aquí se muestran los servicios registrados en Supabase.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            {loading ? 'Cargando...' : `${servicios.length} servicios`}
          </span>
        </div>

        {loading ? (
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">Cargando servicios...</div>
        ) : error ? (
          <div className="mt-8 rounded-[28px] border border-red-200 bg-red-50 p-8 text-red-700">{error}</div>
        ) : servicios.length === 0 ? (
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">No hay servicios guardados.</div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {servicios.map((item) => (
              <article key={item.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{item.servicio}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.descripcion}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void handleEdit(item)}
                      className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(item.id)}
                      className="rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                {item.detalles.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.detalles.map((detalle, index) => (
                      <span key={index} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                        {detalle}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
