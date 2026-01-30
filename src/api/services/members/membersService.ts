import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './membersMockData.json';
import type { Member, CreateMemberDTO, UpdateMemberDTO } from '@/store/types/members.types';

// Register mock data
mockAdapter.registerMockData('/members', mockData);

class MembersService {
    async getMembers(): Promise<Member[]> {
        const response = await apiClient.get<Member[]>('/members');
        return response.data;
    }

    async getMemberById(id: string): Promise<Member> {
        const response = await apiClient.get<Member>(`/members/${id}`);
        return response.data;
    }

    async createMember(data: CreateMemberDTO): Promise<Member> {
        const response = await apiClient.post<Member>('/members', data);
        return response.data;
    }

    async updateMember(id: string, data: UpdateMemberDTO): Promise<Member> {
        const response = await apiClient.put<Member>(`/members/${id}`, data);
        return response.data;
    }

    async deleteMember(id: string): Promise<void> {
        await apiClient.delete(`/members/${id}`);
    }

    async inviteMember(email: string, roles: string[]): Promise<Member> {
        const response = await apiClient.post<Member>('/members/invite', { email, roles });
        return response.data;
    }

    async resendInvite(id: string): Promise<void> {
        await apiClient.post(`/members/${id}/resend-invite`);
    }
}

export const membersService = new MembersService();
