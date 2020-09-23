import React, {useState} from 'react';
import './ActivityList.css'
import Activity from "../activity/Activity";
import ActivityRemoveDialog from "../activity-remove-dialog/ActivityRemoveDialog";
import {CSSTransitionGroup} from 'react-transition-group'
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

function ActivityList({activities, completedActivityIds, onUpdate, onDelete, onToggle, onDragEnd}) {

    const transitionDuration = 300;

    const [activityToRemove, setActivityToRemove] = useState(null);

    const handleDelete = () => {
        onDelete(activityToRemove);
        setActivityToRemove(null);
    }

    const handleDragEnd = (data) => {
        if (!data.destination) {
            return;
        }
        onDragEnd({
            sourceIndex: data.source.index,
            destinationIndex: data.destination.index
        });
    }

    const getDraggableItemStyle = (isDragging, draggableStyle) => {
        const { transform } = draggableStyle;
        let activeTransform = {};
        if (transform) {
            activeTransform = {
                transform: `translate(0, ${transform.substring(transform.indexOf(',') + 1, transform.indexOf(')'))})`
            };
        }
        if (isDragging) {
            Object.assign(draggableStyle, {background: 'var(--color-background)', opacity: 0.5});
        }
        return {
            ...draggableStyle,
            ...activeTransform,
        };
    };

    return (
        <div className="drag-container">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable" direction="vertical">
                    {(provided, snapshot) => (
                        <div className="activity-list"  {...provided.droppableProps} ref={provided.innerRef}>
                            <CSSTransitionGroup
                                transitionName="activity-list-transition"
                                transitionEnterTimeout={transitionDuration}
                                transitionLeaveTimeout={transitionDuration}>
                                {activities.map((activity, index) =>
                                    <Draggable key={activity.id} draggableId={activity.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef}
                                                 {...provided.draggableProps}
                                                 {...provided.dragHandleProps}
                                                 style={getDraggableItemStyle(
                                                     snapshot.isDragging,
                                                     provided.draggableProps.style
                                                 )}>
                                                <Activity activity={activity}
                                                          completed={completedActivityIds.indexOf(activity.id) >= 0}
                                                          onToggle={() => onToggle(activity.id)}
                                                          onUpdate={onUpdate}
                                                          onDelete={() => setActivityToRemove(activity)}/>
                                            </div>
                                         )}
                                    </Draggable>
                                )}
                                {provided.placeholder}
                            </CSSTransitionGroup>
                            <div className="activity-list__overflow-mask"/>
                            {activityToRemove &&
                            <ActivityRemoveDialog activity={activityToRemove}
                                                  onConfirm={() => handleDelete()}
                                                  onCancel={() => setActivityToRemove(null)}/>
                            }
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default ActivityList;
