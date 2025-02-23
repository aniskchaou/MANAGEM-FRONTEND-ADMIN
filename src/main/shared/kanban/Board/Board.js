import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import cn from 'classnames';

export function DraggableCard({ id, title, columnId, columnIndex, moveCard, isSpacer }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'Card',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'Card',
    hover: (draggedItem) => {
      if (draggedItem.id !== id) {
        moveCard(draggedItem.id, columnId, columnIndex);
      }
    },
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className={cn('Card', {
        'Card--dragging': isDragging,
        'Card--spacer': isSpacer,
      })}
    >
      <div className="Card__title">{title}</div>
    </div>
  );
}

export default DraggableCard;
