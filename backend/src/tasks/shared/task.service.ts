import { Injectable } from '@nestjs/common';
import { Task } from './task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {

    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>){

    }

    getAll = async (): Promise<Task[]> => {
        return await this.taskModel.find().exec();
    }

    getById = async (id: string): Promise<Task> => {
        return await this.taskModel.findById(id).exec();
    }

    create = async (task: Task): Promise<Task> => {
        const createdTask = new this.taskModel(task);
        return await createdTask.save();
    }

    update = async (id: string, task: Task): Promise<Task> => {
        await this.taskModel.updateOne({ _id: id }, task).exec();
        return this.getById(id);
    }

    delete = async (id: string): Promise<any> => {
        return await this.taskModel.deleteOne({ _id: id }).exec();
    }

}
