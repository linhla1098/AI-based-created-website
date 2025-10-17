import { DataSource } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import {
  IdleResource,
  IdleResourceStatus,
  ResourceSource,
} from './entities/idle-resource.entity';
import * as bcrypt from 'bcrypt';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'idle_resource_db',
  entities: [User, IdleResource],
  synchronize: true,
  logging: true,
});

async function seedDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('🔗 Database connected successfully');

    // Clear existing data (handle foreign key constraints)
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await AppDataSource.getRepository(IdleResource).clear();
    await AppDataSource.getRepository(User).clear();
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('🗑️  Cleared existing data');

    // Hash password for all users
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create comprehensive test users across all roles
    const users = [
      {
        username: 'admin',
        password: hashedPassword,
        role: UserRole.ADMIN,
        department: 'IT',
      },
      {
        username: 'ra_user1',
        password: hashedPassword,
        role: UserRole.RA,
        department: 'IT',
      },
      {
        username: 'ra_user2',
        password: hashedPassword,
        role: UserRole.RA,
        department: 'HR',
      },
      {
        username: 'manager_it',
        password: hashedPassword,
        role: UserRole.MANAGER,
        department: 'IT',
      },
      {
        username: 'manager_hr',
        password: hashedPassword,
        role: UserRole.MANAGER,
        department: 'HR',
      },
      {
        username: 'manager_finance',
        password: hashedPassword,
        role: UserRole.MANAGER,
        department: 'Finance',
      },
      {
        username: 'viewer1',
        password: hashedPassword,
        role: UserRole.VIEWER,
        department: 'IT',
      },
      {
        username: 'viewer2',
        password: hashedPassword,
        role: UserRole.VIEWER,
        department: 'Marketing',
      },
    ];

    // Insert users and get saved entities
    const userRepository = AppDataSource.getRepository(User);
    const savedUsers = [];
    for (const userData of users) {
      const user = userRepository.create(userData);
      const savedUser = await userRepository.save(user);
      savedUsers.push(savedUser);
    }
    console.log(`👥 Created ${savedUsers.length} users`);

    // Create realistic idle resource scenarios
    const idleResources = [
      {
        employeeId: 'EMP001',
        employeeName: 'Takeshi Yamamoto',
        department: 'IT',
        idleFromDate: new Date('2024-01-15'),
        status: IdleResourceStatus.OPEN,
        processNote:
          'Available for frontend development project. Has expertise in React and modern JavaScript frameworks.',
        rate: 4500.0,
        skills: 'React, TypeScript, Node.js, AWS, Docker, MongoDB',
        source: ResourceSource.INTERNAL,
        isUrgent: true,
        createdById: savedUsers[0].id,
        updatedById: savedUsers[0].id,
        cvFilePath: '/uploads/cv-files/takeshi_yamamoto_cv.pdf',
        cvFileName: 'takeshi_yamamoto_cv.pdf',
      },
      {
        employeeId: 'EMP002',
        employeeName: 'Sarah Johnson',
        department: 'Marketing',
        idleFromDate: new Date('2024-01-20'),
        status: IdleResourceStatus.IN_PROGRESS,
        processNote:
          'Currently interviewing for digital marketing specialist role.',
        rate: 3800.0,
        skills:
          'Digital Marketing, SEO, Google Analytics, Content Creation, Social Media',
        source: ResourceSource.INTERNAL,
        isUrgent: false,
        createdById: savedUsers[1].id,
        updatedById: savedUsers[4].id,
        cvFilePath: '/uploads/cv-files/sarah_johnson_cv.pdf',
        cvFileName: 'sarah_johnson_cv.pdf',
      },
      {
        employeeId: 'EMP003',
        employeeName: 'David Chen',
        department: 'Finance',
        idleFromDate: new Date('2024-01-25'),
        status: IdleResourceStatus.OPEN,
        processNote: 'Experienced financial analyst seeking new opportunities.',
        rate: 5200.0,
        skills: 'Financial Analysis, Excel, SAP, Power BI, Risk Management',
        source: ResourceSource.EXTERNAL,
        isUrgent: true,
        createdById: savedUsers[2].id,
        updatedById: savedUsers[5].id,
        cvFilePath: '/uploads/cv-files/david_chen_cv.pdf',
        cvFileName: 'david_chen_cv.pdf',
      },
      {
        employeeId: 'EMP004',
        employeeName: 'Maria Garcia',
        department: 'HR',
        idleFromDate: new Date('2024-02-01'),
        status: IdleResourceStatus.CLOSED,
        processNote: 'Successfully placed in HR Specialist position.',
        rate: 4000.0,
        skills:
          'Recruitment, Training, HRIS, Employee Relations, Performance Management',
        source: ResourceSource.INTERNAL,
        isUrgent: false,
        createdById: savedUsers[2].id,
        updatedById: savedUsers[4].id,
        cvFilePath: '/uploads/cv-files/maria_garcia_cv.pdf',
        cvFileName: 'maria_garcia_cv.pdf',
      },
      {
        employeeId: 'EMP005',
        employeeName: 'Michael Brown',
        department: 'Operations',
        idleFromDate: new Date('2024-02-05'),
        status: IdleResourceStatus.OPEN,
        processNote: 'Operations manager with supply chain expertise.',
        rate: 4800.0,
        skills: 'Supply Chain, Logistics, Process Improvement, Lean Six Sigma',
        source: ResourceSource.REFERRAL,
        isUrgent: false,
        createdById: savedUsers[0].id,
        updatedById: savedUsers[0].id,
        cvFilePath: '/uploads/cv-files/michael_brown_cv.pdf',
        cvFileName: 'michael_brown_cv.pdf',
      },
      {
        employeeId: 'EMP006',
        employeeName: 'Lisa Wang',
        department: 'IT',
        idleFromDate: new Date('2024-02-10'),
        status: IdleResourceStatus.IN_PROGRESS,
        processNote: 'Backend developer currently in final interview stage.',
        rate: 5000.0,
        skills: 'Java, Spring Boot, PostgreSQL, Microservices, Kubernetes',
        source: ResourceSource.INTERNAL,
        isUrgent: true,
        createdById: savedUsers[1].id,
        updatedById: savedUsers[3].id,
        cvFilePath: '/uploads/cv-files/lisa_wang_cv.pdf',
        cvFileName: 'lisa_wang_cv.pdf',
      },
    ];

    // Insert idle resources
    const resourceRepository = AppDataSource.getRepository(IdleResource);
    for (const resourceData of idleResources) {
      const resource = resourceRepository.create(resourceData);
      await resourceRepository.save(resource);
    }
    console.log(`💼 Created ${idleResources.length} idle resources`);

    // Display comprehensive summary with statistics
    const totalUsers = await userRepository.count();
    const totalResources = await resourceRepository.count();
    const openResources = await resourceRepository.count({
      where: { status: IdleResourceStatus.OPEN },
    });
    const inProgressResources = await resourceRepository.count({
      where: { status: IdleResourceStatus.IN_PROGRESS },
    });
    const closedResources = await resourceRepository.count({
      where: { status: IdleResourceStatus.CLOSED },
    });
    const urgentResources = await resourceRepository.count({
      where: { isUrgent: true },
    });

    console.log('\n📊 Database Seeding Summary:');
    console.log(`✅ Total Users: ${totalUsers}`);
    console.log(`✅ Total Resources: ${totalResources}`);
    console.log(`📈 Open Resources: ${openResources}`);
    console.log(`⏳ In Progress Resources: ${inProgressResources}`);
    console.log(`✅ Closed Resources: ${closedResources}`);
    console.log(`🚨 Urgent Resources: ${urgentResources}`);
    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };
