import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, status, dueDate } = body;
    const id = params.id;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : null
      }
    });

    return NextResponse.json(task);
  } catch (error: any) {
    console.error('Error updating task:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await prisma.task.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting task:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
