import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LogoutDto } from './dto/create-auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Admin login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logout successfully' })
  logout(@Body() logoutDto: LogoutDto) {
    return this.authService.logout(logoutDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User register' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  register(@Body() loginDto: LoginDto) {
    return this.authService.register(loginDto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'refresh token' })
  @ApiBody({ type: LogoutDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  refresh(@Body() tokenDto: LogoutDto) {
    return this.authService.refresh(tokenDto);
  }

  @Post('superadminlogin')
  @ApiOperation({ summary: 'SuperAdmin login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'SuperAdmin logged in successfully',
  })
  adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.superadminLogin(loginDto);
  }
}
