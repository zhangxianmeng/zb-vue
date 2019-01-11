<script src="../../../../vue.config.js"></script>
<template>
  <div>
   <div id="agent">
    <div class="navs">
      <div class="nav-content">
        <a href="/index">
          <img :src="logo" alt="">
        </a>
        <div class="rt">
          <span><a href="/index">返回首页</a></span>
          <span class="reg" @click="openDialog('tabreg')">立即注册</span>
        </div>
      </div>
    </div>
    <full-page :options="options" id="fullpage" ref="fullpage">
      <div class="section section1">
            <h3>无论身在何处，只要加入尊宝，您就能暴富！</h3>
            <h5>业界最具权威的诚信品牌 期待您的加入！</h5>
            <div><img class="reg" @click="openDialog('tabreg')" src="./img/1-reg.png" alt=""></div>
            <div><a href="#page4">联系我们</a></div>
            <div class="con-1">
              <div class="item">
                <img src="./img/1-1c.png" alt="">
                <h5>日结佣金</h5>
                <p>专业的资金管理</p>
                <p>移动端</p>
                <p>让您日结佣金</p>
                <p>更放心</p>
              </div>
              <div class="item">
                <img src="./img/1-2c.png" alt="">
                <h5>自助优惠</h5>
                <p>零等待</p>
                <p>百分百</p>
                <p>全网百款优惠统统</p>
                <p>自助领取</p>
              </div>
              <div class="item">
                <img src="./img/1-3c.png" alt="">
                <h5>实力强大</h5>
                <p>首批合法欧洲</p>
                <p>上市博彩公司 </p>
                <p>持有菲律宾官方</p>
                <p>营业准许证</p>
              </div>
              <div class="item">
                <img src="./img/1-4c.png" alt="">
                <h5>秒提技术</h5>
                <p>每一位加盟</p>
                <p>尊宝的代理 </p>
                <p>提款、结算统统走</p>
                <p>VIP通道秒到账</p>
              </div>
            </div>
      </div>
      <div class="section section2">
        <h3>加入尊宝合作计划，年薪百万不是梦</h3>
        <h5>首家开发兼容IOS、Android、H5多款代理专属移动端，采用加密技术手段让您资金更安全。</h5>
        <div class="c-2">
          <div class="item" @click="openDialog('sec1')">
            <div class="img-bar">
              <div class="mask"></div>
              <img src="./img/2-c1.png" alt="">
              <img class="cons" src="./img/3-1.png" alt="">
            </div>
          </div>
          <div class="item" @click="openDialog('sec2')">
            <div class="img-bar">
              <div class="mask"></div>
              <img src="./img/2-c2.png" alt="">
              <img class="cons" src="./img/3-2.png" alt="">
            </div>
          </div>
          <div class="item" @click="openDialog('sec3')">
            <div class="img-bar">
              <div class="mask"></div>
              <img src="./img/2-c3.png" alt="">
              <img class="cons" src="./img/3-3.png" alt="">
            </div>
          </div>
          <div class="item" @click="openDialog('sec4')">
            <div class="img-bar">
              <div class="mask"></div>
              <img src="./img/2-c4.png" alt="">
              <img class="cons" src="./img/3-4.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="section section3">
        <h3>亚洲最牛逼的手机博彩</h3>
        <h5>只有您不知道的平台，没有您玩不到游戏</h5>
        <img src="./img/3-img.png" alt="">
      </div>
      <div class="section section4">
        <h3>赶快联系我们，打开你的人生赢家之门</h3>
        <h5>加入尊宝，毫不费力就能赢的美丽人生</h5>
        <div class="c4">
          <div class="lf">
            <ul class="slides">
              <li v-for="(slide, index) in slideData" :class="slidePosition(index)">
                <img :src="slide.src" alt="" />
              </li>
              <button class="btnlf" @click="previousSlide()"></button>
              <button class="btnrt" @click="nextSlide()"></button>
            </ul>
          </div>
          <div class="rt">
            <div>
              <h4>联系方式</h4>
              <div class="items">
                <span><img src="./img/4qq.png" alt=""></span>
                <div>
                  <p v-for="item in config.qq">
                    {{item}}
                  </p>
                </div>
              </div>
              <div class="items">
                <span><img src="./img/4skype.png" alt=""></span>
                <div>
                  <p>9129752651 </p>
                </div>
              </div>
              <div class="items">
                <span><img src="./img/4youxiang.png" alt=""></span>
                <div>
                  <p>aff@zb970.com </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </full-page>
    <ul class="actions">
      <li @click="$refs.fullpage.api.moveSectionDown()" class="actions-button"><img src="./img/arrow.png" alt=""></li>
    </ul>
    <div class="navRight">
      <div class="line"></div>
      <ul id="menu">
        <li data-menuanchor="page1" class="active"><i></i><a href="#page1">代理首页</a></li>
        <li data-menuanchor="page2"><i></i><a href="#page2">代理制度</a></li>
        <li data-menuanchor="page3"><i></i><a href="#page3">游戏优势</a></li>
        <li data-menuanchor="page4"><i></i><a href="#page4">联系我们</a></li>
      </ul>
    </div>

    <!--reg-->
    <v-dialog @on-close="closeDialog('tabreg')" :height="700" :is-show="tabreg">
      <div>
        <div class="dialog-header">
          <h3>申请加盟</h3>
        </div>
        <div class="dialog-body">
          <div class="form account-info">
            <div class="mobile-input-group">
              <label class="label" for="loginname">
                <span>*</span>用户名
              </label>
              <div>
                <input placeholder="账号以a_ 开头（a后面是下划线_），由3-15个数字或英文字母组成" v-model="registerData.loginName" id="loginname" type="text">
              </div>
            </div>
            <div class="mobile-input-group">
              <label class="label" for="password">
                <span>*</span>密码
              </label>
              <div>
                <input v-model="registerData.password" id="password" type="password" placeholder="密码长度为6-16个字符,必须含有字母和数字的组合">
              </div>
            </div>
            <div class="mobile-input-group">
              <label class="label" for="rePwd">
                <span>*</span>确认密码
              </label>
              <div>
                <input v-model="registerData.rePwd" id="rePwd" type="password" placeholder="请重复您的密码">
              </div>
            </div>

            <div class="mobile-input-group">
              <label class="label" for="accountName">
                <span>*</span>真实姓名
              </label>
              <div>
                <input type="text" v-model="registerData.accountName" id="accountName" placeholder="必须与你的银行账户名称相同，否则不能出款">
              </div>
            </div>

            <div class="mobile-input-group">
              <label class="label" for="phone">
                <span>*</span>手机号
              </label>
              <div>
                <input type="text" v-model="registerData.phone" id="phone" placeholder="请确保电话真实畅通，以便电话核实为您开通">
              </div>
            </div>

            <div class="mobile-input-group">
              <label class="label" for="qq">
                <span>*</span>QQ/Skype
              </label>
              <div>
                <input type="text" v-model="registerData.qq" id="qq" placeholder="玩家注册时必须填写QQ或skype账户">
              </div>
            </div>

            <div class="mobile-input-group">
              <label class="label" for="email">
                <span>*</span>邮箱
              </label>
              <div>
                <input type="text" v-model="registerData.email" id="email" placeholder="请输入您的邮箱，建议@google.com">
              </div>
            </div>

            <div class="mobile-input-group">
              <label class="label" for="microchannel">
                微信
              </label>
              <div>
                <input type="text" v-model="registerData.microchannel" id="microchannel" placeholder="请输入微信号">
              </div>
            </div>


            <div class="mobile-input-group">
              <label class="label" for="partner">
                代理审核码
              </label>
              <div>
                <input type="text" v-model="registerData.partner" id="partner" placeholder="没有审核码可以不用填写">
              </div>
            </div>

            <div class="mobile-input-group code-bar">
              <label class="label" for="validateCode">
                <span>*</span>验证码
              </label>
              <div>
                <input type="text" v-model="registerData.validateCode" id="validateCode" placeholder="请输入正确的验证码">
              </div>
              <span>
                    <img @click="changeCode" :src="validateCodeForIndex" alt="" height="30">
                  </span>
            </div>


            <div class="mobile-input-group">
              <div class="agree-special">
                <input type="checkbox" v-model="registerData.agree" id="agree">
                <p><label for="agree">本人已经超过合法年龄以及本人在此网站的所有活动并没有抵触本人 所身在的国家所管辖的法律，并同时接受《尊宝娱乐城合作协议》</label></p>
              </div>
            </div>

            <div class="mobile-input-group">
              <div class="subs">
                <button class="el-button el-button--warning" @click="registerSubmit" type="button">立即注册</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </v-dialog>
    <!--c1-->
    <v-dialog @on-close="closeDialog('sec1')" :is-show="sec1">
      <div>
        <div class="dialog-header">
          <h3>如何加入</h3>
        </div>
        <div class="dialog-body">
          <h5>操作流程：</h5>
          <p>1.首先您需要注册我们的合作代理，务必填写真实，否则审核不通过。</p>
          <p>2.注册完毕我们将在24小时内与您取得联系并核实信息。</p>
          <p>3.在代理中心找到您的推广链接，发展下线玩家。</p>
          <p>4.佣金每日18:00会发放您的代理账号，请注意查收(周日除外)。</p>
        </div>
      </div>
    </v-dialog>
    <!--c2-->
    <v-dialog @on-close="closeDialog('sec2')" :height="680" :width="800" :is-show="sec2">
      <div>
        <div class="dialog-header">
          <h3>代理佣金</h3>
        </div>
        <div class="dialog-body">
          <h5>品牌优势：</h5>
          <p>超强实力--- 尊宝做为博彩界最有实力财团公司旗下的品牌，立志打造最有影响力的品牌。</p>
          <p>超高技术--- 全自动化优惠，全自动化秒提，7X24小时在线客服，超强的用户体验，不会流失您的客户。</p>
          <p>最先进的日结模式---尊宝采用全球最先进的日结模式，规避风险，保证您的资金无忧。</p>
          <p>超高的佣金----尊宝代理佣金最高可达50%，让您轻松做老板。</p>
          <h5>操作流程</h5>
          <p>1.首先您需要注册我们的合作代理，务必填写真实，否则审核不通过。</p>
          <p>2.注册完毕我们将在24小时内与您取得联系并核实信息。</p>
          <p>3.在代理中心找到您的推广链接，发展下线玩家。</p>
          <p>4.佣金每日18:00会发放您的代理账号，请注意查收(周日除外)。</p>
          <h5>佣金结算</h5>
          <p>每日我们会根据您的下线净盈利来自动计算您的佣金，系统最低计算为30% 若一个月后您达到40%的标准，我们将在下个月6号给您补发剩余的10%佣金给您。</p>
          <div class="table">
            <table>
              <thead>
              <tr>
                <th>等级</th>
                <th>活跃玩家</th>
                <th>当月净利润（RMB）</th>
                <th>佣金比例</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>≥3</td>
                <td>0-250000</td>
                <td>30%</td>
              </tr>

              <tr>
                <td>2</td>
                <td>≥10</td>
                <td>250001-600000</td>
                <td>35%</td>
              </tr>
              <tr>
                <td>3</td>
                <td>≥30</td>
                <td>600001-1200000</td>
                <td>40%</td>
              </tr>
              <tr>
                <td>4</td>
                <td>≥50</td>
                <td>1200001-2000000</td>
                <td>45%</td>
              </tr>

              <tr>
                <td>5</td>
                <td>≥90</td>
                <td>2000000</td>
                <td>50%</td>
              </tr>
              <tr>
                <td>结算方式</td>
                <td colspan="3">佣金计算</td>
              </tr>
              <tr>
                <td>日结佣金</td>
                <td colspan="3">老虎机佣金（PT/DT/MG/PNG/TTG/NT/QT/AG老虎机/AGIN捕鱼平台输赢*85％-返水-优惠）*佣金比例
                  其他平台佣金:(AG/SB/N2等其他平台输赢X90%-返水-优惠）*佣金比例</td>
              </tr>
              </tbody>
            </table>
          </div>
          <h5>佣金日结标准</h5>
          <p>提款要求：代理账户老虎机平台佣金额度≥100元即可提款。</p>
          <p>备注: 1-5号此时间段佣金不更新，于6号统一执行！</p>
          <p class="red">注：享受日结的代理如果连续两个月没有新增一位活跃会员，将在第三个月的时候取消其日结模式，如果在第三个月有开发会员，在次月开启日结。</p>
          <p>其他类：AG真人/Ebet真人/沙巴体育 </p>
          <p>其他类计算公式：(平台输赢x90%-优惠-反水）= 纯利润， 纯利润x佣金比例=佣金。 </p>
          <p>老代理：历史佣金累计15万以上，且连续6个月有佣金记录，可升级为VIP代理，享有佣金日结。</p>
          <p>新代理：累计佣金30万以上，每月满足活跃会员要求，才能晋级VIP代理，享有日结佣金。</p>
          <p>提款要求：每月月初1-5号为提款时间，请在这个时间段内申请其它平台的佣金额度，如果规定时间内未提款，佣金将累计至下月。</p>
          <p class="red">注：最终综合评定方可晋级，佣金负值累计。若合作伙伴自己的游戏账号注册 到自己代理下线，取消代理资格，佣金不予发放。</p>
          <p>玩家输赢里面包含了平台给玩家的所有优惠红利 以及公司向平台方支付的平台费用，尊宝国际合作伙伴需共同承担相应比例的费用包括：</p>
          <p>（1）优惠——尊宝国际给予玩家的现金红利都计算在输赢里面。</p>
          <p>（2）反水——尊宝国际每日会给玩家相应的反水，反水计算在玩家输赢里面。</p>
          <p>（3）平台费用——尊宝国际需提款游戏平台供应商10%~15%的平台费用。</p>
          <p>合作伙伴必须严格遵守尊宝国际相关条款条例，以免造成不必要的误会。</p>
          <h5>佣金计算标准</h5>
          <p>1. 针对其他类佣金发放日为每月1—5号。(结算时间为自然月：上月1号：00:00点至本月1号00:00)。</p>
          <p>2. 当月达到3位有效会员且佣金大于100元。</p>
          <p>3. 有效会员标准，当月存款大于500元，投注额大于1000元。</p>
          <p>4. 若当月未达到发放标准，佣金会累计至某月达到要求后一起发放。</p>
          <p>5. 若当月代理佣金为负值，会累计至下月，等至累计正数且要求达到后佣金发放。</p>
          <p>6. 若合作伙伴自己的游戏账号注册到自己代理下线，取消代理资格，佣金不予发放。</p>
          <p class="red">再次申明：合作代理本人的游戏账号禁止注册到自己的代理线下。</p>

        </div>
      </div>
    </v-dialog>
    <!--c3-->
    <v-dialog @on-close="closeDialog('sec3')" :height="680" :width="800" :is-show="sec3">
      <div>
        <div class="dialog-header">
          <h3>常见问题</h3>
        </div>
        <div class="dialog-body">
          <h5>1、怎样注册代理？</h5>
          <p>A：登陆代理页面即可看到“申请加盟”字样，点击即可来到注册页面，注册的时候，请仔细阅读我们的代理合作协议说明书。</p>
          <h5>2、合营代理有任何费用吗？</h5>
          <p>A：这是零投资的赚钱方式，您是无需花费任何费用开始，仅仅只需点击“立即注册”，注册后您将拥有一个独一无二的合营官网链接，然后便能开始向您的会员宣传推广而赚取佣金了。</p>
          <h5>3、怎样赚取佣金？支付佣金是怎么样的？</h5>
          <p>A：只要您注册了代理账号之后，会生成一个您独立的链接，然后您可以推广自己的链接，让其他人在您的链接注册并且游戏。然后他们产生负盈利的话，你就有佣金了。我们会按照日结累计，只要您满足佣金累计到了100以上就可以随时提款。</p>
          <h5>4、我怎么能知道我一个月挣了多少钱？</h5>
          <p>A：尊宝国际拥有强大的技术团队，所有合营人员都可以自己登陆自己的账号查看到自己下线的输赢情况（登陆账号——点击账户管理——佣金明细）。</p>
          <h5>5、我如何知道注册的会员是不是在我的下线？</h5>
          <p>A：如果您推荐的会员有注册成功，那么您直接可以在自己的后台看到他的情况。（登陆账号——点击账户管理——下线会员)。</p>
          <h5>6、如何能保证我的佣金可以结算给我？</h5>
          <p>A：尊宝国际所有的结算系统都是采用了强大技术创造的全自动结算模式。只要您下线会员有产生负盈利，那么系统会自动结算完毕，添加到合营账户中，您只需要申请提款即可。</p>
          <h5>7、下线会员无法打开链接怎么处理？</h5>
          <p>A：尊宝国际是属于菲律宾正规博弈老虎机娱乐城，国内一些具有拦截性质的浏览器会产生一些影响，建议会员使用谷歌浏览器进入，您也可以联系我们的在线客服索要备用网址。</p>
          <h5>8、下线会员的情况我可以看到吗？</h5>
          <p>A：合营人员可以在自己的合营账号看到下线会员所有的存款、提款、输赢等信息！所有的信息都在账户管理可以看到的哦！</p>
          <h5>9、合营链接是否可以修改？</h5>
          <p>A：如果您需要修改您的合营链接，那么您可以联系我们的市场部门专员，提供您的注册信息，进行修改您自己熟悉的链接哦！</p>
          <h5>10、长时间没有登录忘记了密码，或者输入5次错误密码被冻结怎么办？</h5>
          <p>A：如果忘记密码或者账号被锁定，您可以直接点击“登入”后面的“忘记密码”使用邮箱或者电话进行重置，重置成功之后账号自动恢复正常的哦!</p>
          <h5>11、日结佣金需要达到一个什么样的条件？</h5>
          <p>A：所有代理无需申请，自动日结不需要任何条件！</p>
          <h5>12、我可以自己注册到自己的下线游戏吗？</h5>
          <p>A：尊宝国际绝对禁止此类事件，具体的相关条例，请参照我们代理合作协议的责任与条款！</p>
        </div>
      </div>
    </v-dialog>
    <!--c4-->
    <v-dialog @on-close="closeDialog('sec4')" :height="680" :width="800" :is-show="sec4">
      <div>
        <div class="dialog-header">
          <h3>关于尊宝</h3>
        </div>
        <div class="dialog-body">
          <h5>品牌介绍：</h5>
          <p>尊宝国际创建2015年，隶属于总公司LUCKY STAR ENTERTAINMENT LIMITED， 总公司注册创立于2005年， 2009年获得Firstcagayan正规博彩牌照NO.020-A，公司历经10年之久，全球领先秒提技术迅速占领亚洲市场份额，凭其雄厚的实力及业界优质关系网，致力打造亚洲最佳在线娱乐平台。 尊宝国际拥有目前最火热的老虎机游戏PT、MG/TTG、NT等知名平台的新线路，保证了线路的稳定性。</p>
          <h5>公司文化</h5>
          <p>尊宝国际城秉承以小赌怡情、以小博大的宗旨，科技立身为宗旨，为业界研发打造10秒到账「秒提」「秒存」技术，致力为博弈界打造提款最迅速的游戏平台。</p>
          <h5>品牌优势</h5>
          <p>1、提款：20万以下提款10秒到账，全球首发。</p>
          <p>2、服务：7x24小时在线服务，提供优质服务。</p>
          <p>3、 安全：采用128位ssl高标准加密技术。</p>
          <p>4、 佣金结算：采用全球最优质的结算方式日结佣金。</p>
          <p>5、产品丰富：PT、DT、MG、PNG、TTG、NT、QT、AG、沙巴体育、N2。</p>
          <p>6、强大的品牌优势：多年业界运营实践经验，咨询丰富。</p>
          <p>7、平台自动化：自助优惠，自助洗码，独立研发。</p>
          <h5>我们承诺</h5>
          <p>免费：加入尊宝国际，不需要您有任何的费用承担。</p>
          <p>稳定：只要有固定的网络客户资源或者现实客户资源，都可以稳定的收入。</p>
          <p>日结：无需再等待周期，只要大于100就可以随时提款。</p>
        </div>
      </div>
    </v-dialog>
  </div>
  </div>

</template>

<script>
    import VDialog from '@/components/dialog/dialog'
    import VueFullPage from 'vue-fullpage.js'
    import Vue from 'vue'
    Vue.use(VueFullPage)
    import {agentJoinModule} from '@/common/js/mixin'
    import config from '@/common/js/config'

  export default {
    name:'#agent',
    mixins: [agentJoinModule],
    data() {
      return {
          logo: require('@/common/image/newlogo.png'),
          options: {
              menu: '#menu',
              anchors: ['page1', 'page2', 'page3', 'page4'],
              licenseKey: '',
          },
          slider:{
              counter: 0,
              slides:[
                  {
                      src: require('./img/4-1.png'),
                      title: 'Catty',
                  },
                  {
                      src: require('./img/4-2.png'),
                      title: 'Patty',
                  },
                  {
                      src: require('./img/4-3.png'),
                      title: 'Fatty',
                  },
                  {
                      src: require('./img/4-4.png'),
                      title: 'Fatty',
                  },
              ]
          },
          tabreg:false,
          sec1:false,
          sec2:false,
          sec3:false,
          sec4:false,
      }
    },
    methods: {
        slidePosition(index){
            let counter = this.slider.counter
            if(index == counter){return 'slide-center'}
            let right = counter + 1
            if(right > this.slideData.length - 1){right = 0}
            if(index == right){return 'slide-right'}
            let left = counter - 1
            if(left < 0){left = this.slideData.length - 1}
            if(index == left){return 'slide-left'}
            let rightOut = counter + 2
            if(rightOut == this.slideData.length){rightOut = 0}
            if(rightOut == this.slideData.length + 1){rightOut = 1}
            if(index == rightOut){return 'slide-right-out'}
            let leftOut = counter - 2
            if(leftOut == -1){leftOut = this.slideData.length - 1}
            if(leftOut == -2){leftOut = this.slideData.length - 2}
            if(index == leftOut){return 'slide-left-out'}
        },
        nextSlide(){
            if(this.slider.counter == this.slideData.length - 1){
                this.slider.counter = 0
            } else {
                this.slider.counter++
            }
        },
        previousSlide(){
            if(this.slider.counter == 0){
                this.slider.counter = this.slideData.length - 1
            } else {
                this.slider.counter--
            }
        },
        closeDialog(attr) {
            this[attr] = false
        },
        openDialog(attr) {
            this[attr] = true
        },
    },
    computed:{
        slideData(){
            let data = [];
            this.slider.slides.forEach(slide => data.push(slide))
            this.slider.slides.forEach(slide => data.push(slide))
            this.slider.slides.forEach(slide => data.push(slide))
            return data;
        }
    },
    watch: {},
    components: {VDialog}
  }
</script>
<style lang="stylus">
#agent .dialog-header h3
  font-size 24px
#agent .dialog-cover
  background: url(./img/bgw.jpg) no-repeat
  background-size: cover;
  opacity 1
.dialog-body
  line-height 2
  font-size 16px
  h5
    color #2072f7
    font-weight bold
    line-height 3
.table table td, .table table th
  border: 1px solid #ddd
.section1.active>div
  animation: zoomInDown 1s linear
.section2.active>div
  animation: bounceInLeft 1s linear
.section3.active>div
  animation: zoomInDown 1.5s linear
.section4.active>div
  animation: rollIn 1s linear
.red
  color red

@keyframes a-float {
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(10%);
  }
  75% {
    transform: translateY(-10%);
  }
}
@keyframes bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(-3000px, 0, 0);
    transform: translate3d(-3000px, 0, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(25px, 0, 0);
    transform: translate3d(25px, 0, 0);
  }

  75% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  90% {
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes zoomInDown {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}
@keyframes rollIn {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
body .mobile-input-group .label
  width: 18%;
  float: left;
body .mobile-input-group input
  width: 72%
</style>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
@import './fullpage.css'
#agent
  z-index: 999;
  position: fixed;
  top: 0;
  .code-bar
    position relative
    span
      position: absolute;
      right: 50px;
      top: 0;
  .mobile-input-group
    .agree-special
        position: relative;
        text-indent: 20px
        #agree
          position: absolute;
          left: 2px;
          width: auto;
          top: 9px;
    .subs
      text-align center
  .navs
    position fixed
    top: 0
    left 0
    width 100%
    min-width 1366px
    line-height 100px
    height 100px
    background rgba(52,76,145,.8)
    z-index 9
    .nav-content
      width: 1200px;
      margin: 0 auto;
      .rt
        float right
        span
          display: inline-block;
          border-radius: 50px;
          line-height: 48px;
          padding: 0 20px;
          color: #fff;
          border: 2px solid;
          margin-left: 20px;
          font-size: 20px;
          cursor: pointer;
        .reg
          border-color #f39900
          background #f39900
        a
          color #fff
  .fullpage-wrapper
    min-width 1260px
  #agent
    background #fff
  .btnlf{
    position absolute
    left: -50px;
    width: 0;
    border-width: 38.5px 34px 38.5px 0;
    border-color: transparent #425b91 transparent transparent;
    background transparent
    cursor pointer
  }
  .btnrt
    position absolute
    left: 700px;
    border-width: 38.5px 0 38.5px 34px;
    border-color: transparent transparent transparent #425b91;
    background transparent
    cursor pointer
  .section1.section
    background url(./img/bg1.jpg) no-repeat bottom
    background-size cover
    h3
      color #fff
    h5
      color #fff
    a
      display: block;
      text-decoration: underline;
      color: #fff;
      font-size: 20px;
      margin-bottom: 6%;
    .con-1
      width: 70%;
      margin: 0 auto;
    .reg
      margin 2%
      cursor pointer
    .reg:hover
      animation: pulse 1s linear infinite
    .item
      display inline-block
      width 25%
      color #fff
      p
        line-height 2
      h5
        line-height 2
  .section2
    background url(./img/bg2.jpg) no-repeat bottom
    background-size cover
    .c-2
      width: 70%;
      margin: 2% auto 0;
      .item
        display inline-block
        width 25%
        color #fff
        .img-bar
          position relative
          width 250px
          height 450px
          overflow hidden
          margin:0 auto
          cursor pointer
          .mask
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            background: rgba(255, 255, 255,.5);
            z-index: 99;
          img
            position absolute
            left 0
            bottom 0
          .cons
            left: 30%;
            top: 35%;
            z-index 99
        .img-bar:hover
          animation: pulse 2s linear infinite
          .mask
            display none

  .section3
    background url(./img/bg3.jpg) no-repeat bottom
    background-size cover
    img
      height: 45%;
      margin-top: 2%;
      animation: pulse 2.5s linear infinite;

  .section4
    background url(./img/bg4.jpg) no-repeat bottom
    background-size cover
    .c4
      overflow: hidden;
      width: 1350px;
      margin: 0 auto;
      .fp-tableCell
        max-height 480px
        vertical-align: top;
  .fp-tableCell
    padding-top: 80px;
    min-width 1260px
  .navRight
    position fixed
    top: 40%
    right 0
    width 120px
    .line
      position: absolute;
      top: 26px;
      height: 110px;
      left: 4px;
      width: 1px;
      background: #3a5391
    .active
      a
        color #f39900
      i
        background: #f39900
    i
      display inline-block
      width: 11px
      height: 11px
      margin: 5px 0 0 5px
      transform-origin: 0 100%
      transform:rotate(-45deg)
      background: #3a5391
      margin-right: 10px;
      position: relative;
      top: 2px;
    a
      color: #3a5391;
      font-size: 16px;
      line-height: 2.5;

.section4 .fp-slides
  width: 600px;
  margin-left: 100px;
  height: auto;
  position: absolute;
  left: 100px;
  top: 200px;
.actions li.actions-button
  background transparent
  img
    animation: a-float 3s linear infinite
.navRight #menus li.active a:after
  display none
    background: transparent;

body {
  font-family: arial, helvetica;
}
.section
  position: relative;
  text-align: center;
  h3
    font-size: 45px;
    line-height: 3;
    text-align: center;
    color: #434343;
    font-weight: bold;
  h5
    font-size: 20px;
    font-weight: bold;

#section-1 h2{
  color: #fff;
  font-size: 10em;
  font-weight: 900;
}
#section-1 h1{
  font-size: 2em;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  margin: 1.5em auto 1em auto;
  color: #35495e;
  padding-right: 30px;
  padding-left: 30px;
}
#section-1 li {
  display: inline-block;
  margin: 1.25em 0.3em;
}
.section-1-button{
  padding: 0.93em 1.87em;
  background: #35495e;
  border-radius: 5px;
  display: block;
  color: #fff;
}
h3{
  font-size: 5em;
  text-align: center;
  color: #fff;
  font-weight: bold;
}
#logo{
  position: fixed;
  top: 20px;
  left: 20px;
  color: #fff;
  font-weight: bold;
  z-index: 99;
  font-size: 1.9em;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
}


/* Actions buttons
 * --------------------------------------- */
.actions{
  position: fixed;
  bottom: 2%;
  margin: 0 auto;
  z-index: 9;
  left: 0;
  right: 0;
  text-align: center;
}
.actions li{
  display: inline-block;
  margin: 0.3em 0.3em;
}
.actions-button{
  padding: 0.73em 1.47em;
  background: rgba(53, 73, 94, 0.47);
  border-radius: 5px;
  display: block;
  color: #fff;
  cursor: pointer;
}

/* Twitter
 * --------------------------------------- */
.twitter-share i{
  vertical-align: middle;
  position: relative;
  top: 2px;
  display: inline-block;
  width: 38px;
  height: 14px;
  color: white;
  top: -4px;
  left: -2px;
  fill: #fff;
}
.twitter-share svg{
  height: 40px;
  margin-top: -10px;
}
.view-github{
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 999;
  padding: .93em 1.87em;
  background: #35495e;
  border-radius: 5px;
  display: block;
  color: #fff;
}
.section4
  .lf
    float: left;
    display: inline-block;
    width: 800px;
    ul
      position: relative
      list-style: none
      padding: 0
      display: flex
      justify-content: center
      align-items: center
      height: 470px;
      width: 700px;
      margin-left: 6%;
      margin-top: 3%;
      li
        position: absolute
        height: 200px
        width: 200px
        background: orange
        display: flex
        justify-content: center
        align-items: center
        transition: 400ms ease-in-out
        opacity: 0
      .slide-center
        transform: translate(0%) scale(1)
        opacity: 1
        z-index 99
      .slide-left
        transform: translate(-100%) scale(0.8)
        opacity: 1
      .slide-right
        transform: translate(100%) scale(0.8)
        opacity: 1
      .slide-right-out
        transform: translate(200%) scale(0.6)
        opacity: 0
      .slide-left-out
        transform: translate(-200%) scale(0.6)
        opacity: 0
  .rt
    float: left;
    display: inline-block;
    width: 360px;
    background #e9f1fd
    margin-top 1%
    border-radius 10px
    overflow: hidden;
    margin-left: 3%;
    h4
      color #fff
      background #2c75f0
      line-height 80px
      font-size 24px
      font-weight bold
    .items
      display: flex;
      line-height: 2;
      font-size 20px
      font-weight bold
      padding: 20px 0;
      span
        -webkit-box-flex: 0;
        flex: 0 0 130px;
        width: 100px;
        line-height: 40px;

</style>