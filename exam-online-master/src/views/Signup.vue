<template>
	<div id="signup">
		<el-container>
			<el-container>
				<el-header>
					<el-card class="box-card" shadow="hover" style="width: auto;">
						<div id="information">
							<el-row type="flex" justify="center">
								<el-col :span="4">
									<span>学号：{{getUser.username}}</span>
								</el-col>
								<el-col :span="4">
									<span>姓名：{{getStudent.name}}</span>
								</el-col>
								<el-col :span="4">
									<span>性别：{{getStudent.gender = 'M' ? '男' : '女'}}</span>
								</el-col>
								<el-col :span="4">
									<span>专业：{{clazz.major}}</span>
								</el-col>
								<el-col :span="4">
									<span>年级：{{clazz.year}}</span>
								</el-col>
								<el-col :span="4">
									<span>班级：{{clazz.clazz}}</span>
								</el-col>
							</el-row>
						</div>
					</el-card>
				</el-header>
				<el-main>
					<el-card class="box-card" shadow="hover" style="width: auto; height:540px;margin-top: 20px;">
						<div id="choice" v-for="(item,index) in choices" v-show="index + 1 == current">
							<h>您所报名的考试为：</h><h1 style="text-align:center">{{getExam.name}}</h1>
                            <h1>请您仔细阅读以下注意事项：</h1><span style="white-space: pre-wrap;">{{getExam.tips}}</span>
                            <h1>本次报名费用：25元</h1>
						</div>
					</el-card>
				</el-main>
				<el-footer>
					<div class="box-div">
						<el-row type="flex" justify="start">
							<el-col :span="4" :offset="8">
								<el-button type="primary" @click="okExam(getExam.id)">确认报名并缴费</el-button>
							</el-col>
							<el-col :span="4">
								<el-button type="primary" @click="exitExam()">返回</el-button>
							</el-col>
						</el-row>
					</div>
				</el-footer>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import TimeCountDown from '@/components/TimeCountDown.vue'
	export default {
		data() {
			return {
				clazz: {},
				choices: [],
				fills: [],
				judges: [],
				programs: [],
				answer: [
					[],
					[],
					[],
					[]
				], //保存已作答的答案
				current: 1, //当前题号
				totalScore: 0, //总分
				testMsg: "", //编程题测试信息
			}
		},
		components: {
			TimeCountDown
		},
		computed: {
			//用计算属性显示结果
			fillPos() {
				return this.choices.length + 1;
			},
			judgePos() {
				return this.choices.length + this.fills.length + 1;
			},
			programPos() {
				return this.choices.length + this.fills.length + this.judges.length + 1;
			},
			totalNum() {
				return this.choices.length + this.fills.length + this.judges.length + this.programs.length;
			},
			getStudent() {
				return this.$store.state.student;
			},
			getUser() {
				return this.$store.state.user;
			},
			getPaper() {
				return localStorage.getItem('paper') ? JSON.parse(localStorage.getItem('paper')) : {};
			},
			getExam() {
				return localStorage.getItem('exam') ? JSON.parse(localStorage.getItem('exam')) : {};
			},
			getPractice() {
				return localStorage.getItem('practice') ? JSON.parse(localStorage.getItem('practice')) : {};
			},
			isPractice() {
				return this.$store.state.isPractice;
			}
		},
		methods: {
			// 获取班级信息
			getClazzInfo() {
				this.$axios(`/api/clazzs/${this.getStudent.clazz}/?format=json`).then(res => {
					console.log(res.data)
					this.clazz = res.data
				}).catch(error => {
					console.log(error)
				})
			},
			// 获取选择题
			getChoiceInfo() {
				this.$axios(`/api/choices/?format=json`, {
					params: {
						choice_number: this.getPaper.choice_number,
						level: this.getPaper.level
					}
				}).then(res => {
					this.choices = res.data
					console.log(this.choices)
				}).catch(error => {
					console.log(error)
				})
			},
			// 下一题
			exitExam() {
				this.$message({
							message: '未报名考试',
							type: 'error'
				});
                this.timer = setTimeout(() => { //设置延迟执行
					this.$router.push('/exam')
				}, 1000);
			},
			// 上一题
			okExam(index) {
				this.$message({
							message: '报名成功！即将自动跳转...',
							type: 'success'
				});
                this.GLOBAL.exam_sign[index-1] = 1
                this.timer = setTimeout(() => { //设置延迟执行
					this.$router.push('/exam')
				}, 1000);
			}
		},
		created() {
			this.getClazzInfo();
			this.getChoiceInfo();
		},
	}
</script>

<style lang="scss" scoped>
	.el-header {}

	.el-aside {
		margin-left: 50px;
	}

	.el-main {}

	.el-footer {}

	.el-footer .el-row {
		margin-top: 10px;
	}

	#information {
		margin-top: 20px;
	}

	.box-div {
		border-radius: 2px;
	}

	.box-card {
		width: 250px;
		border-radius: 2px;
	}

	.question-tag {
		text-align: left;
	}

	.el-tag {
		margin-top: 5px;
		margin-left: 10px;
		width: 30px;
		height: 30px;
	}

	.bottom .el-tag {
		width: 20px;
		height: 20px;
	}

	#choice {
		float: left;
		width: auto;
		text-align: left;
	}

	#choice .el-radio-group {
		margin-left: 20px;
		text-align: left;
	}

	#choice .el-radio {
		margin-top: 40px;
	}

	#fill {
		float: left;
		width: auto;
		text-align: left;
	}

	#fill .el-input {
		margin-top: 20px;
		margin-left: 30px;
	}

	#judge {
		float: left;
		width: auto;
		text-align: left;
	}

	#judge .el-radio {
		margin-top: 40px;
	}

	#program {
		float: left;
		width: 1000px;
	}
</style>
