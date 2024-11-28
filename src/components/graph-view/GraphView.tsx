import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge, Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {getFilmAndShipData} from "../../api/starWarsApi.ts";

export default function GraphView({ hero }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);

  const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [setEdges]
  );

  useEffect(() => {
    const fetchData = async () => {
      // Отримуємо дані про фільми та космічні кораблі
      const { films, ships } = await getFilmAndShipData(hero.films, hero.vehicles);

      // Створюємо ноди для героя
      const heroNode = {
        id: hero.id.toString(),
        position: { x: 500, y: 100 },
        data: { label: hero.name },
      };

      // Створюємо ноди для фільмів
      const filmNodes = films.map((film, index) => ({
        id: `film-${hero.films[index]}`,
        position: { x: 200 + index * 200, y: 300 },
        data: { label: film.title },
      }));

      // Створюємо ноди для космічних кораблів
      const shipNodes = ships.map((ship, index) => ({
        id: `ship-${ship.id}`,
        position: { x: 400 + index * 200, y: 500 },
        data: { label: ship.name },
      }));

      // Створюємо зв'язки (edges)
      const heroToFilmEdges = films.map((film, index) => ({
        id: `hero-to-film-${hero.id}-${hero.films[index]}`,
        source: hero.id.toString(),
        target: `film-${hero.films[index]}`,
      }));

      const filmToShipEdges = ships.map((ship, index) => ({
        id: `film-to-ship-${hero.films[index]}-${ship.id}`,
        source: `film-${hero.films[index]}`,
        target: `ship-${ship.id}`,
      }));

      // Встановлюємо стани нод і зв'язків
      setNodes([heroNode, ...filmNodes, ...shipNodes]);
      setEdges([...heroToFilmEdges, ...filmToShipEdges]);

      setLoading(false);
    };

    if (hero && hero.films && hero.vehicles) {
      fetchData();
    }
  }, [hero, setNodes, setEdges]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div style={{ width: '80vw', height: '50vh' }}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
  );
}
