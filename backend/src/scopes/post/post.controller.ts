import { Controller, Post, Body, Param, Put, Delete, Get, UseGuards, Request } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Post as PostEntity } from './entities/post.entity';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post() // Creates a new post
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    const userId = req.user?.userId;
    const { authorId } = createPostDto;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    if (userId !== authorId) {
      throw new UnauthorizedException('You can only create posts for your own account.');
    }

    return this.postService.create(createPostDto, userId);
  }

  @Put(':id') // Updates a post
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postService.remove(id);
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get('timeline')
  async getUserAndFollowedPosts(@Request() req): Promise<PostEntity[]> {
    const userId = req.user?.userId;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.postService.findUserAndFollowedPosts(userId);
  }
}
