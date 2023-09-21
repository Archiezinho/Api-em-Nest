import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from 'src/database/PrismaService';
import { Interval } from '@nestjs/schedule'
import { Cache } from 'cache-manager';

@Injectable()
export class UsersCountService {
    private limit = 10;
    constructor(
        private prisma: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
        ){}
    
    @Interval( 5000 )
    async countUsers(){
        let offset = await this.cacheManager.get<number>('user-offset')
        offset = offset === undefined ? 0 : offset;
        const users = await this.prisma.user.findMany({
            skip: offset,
            take: this.limit
        })
        if(users.length === this.limit){
            this.cacheManager.set('user-offset', offset + this.limit)
        }
        console.log(users.length + offset)
    }
}
