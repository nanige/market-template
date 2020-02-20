/**
 * 跳转到页面相关函数
 * 跳转到
 */

import { getJumpOrigin } from '@/utils/origin.js';
import { getUrlQuery } from '@/utils/url.js';

export function jumpTo(target) {
    // 可用参数：
    // poster海报, shop积分商城，address：地址管理
    const paramOps = ['poster', 'shop', 'address'];
    if (!paramOps.includes(target)) {
        alert('可传入参数必须target为poster', 'shop', 'address')
        return;
    }

    if (target == 'show') {
        return `${getJumpOrigin('shop')}`
    } else if (target == 'address') {
        return `${getJumpOrigin('www')}/static/live/AddressManagement/index.html`
    } else if (target == 'poster') {
        return handerPoster()
    }

    // 转跳个性打卡海报
    function handerPoster() {
        let presentId = getUrlQuery('presentId');
        if (!presentId) {
            alert(`错误：jumpTo函数跳转海报没有presentId`);
            return;
        }
        return `${getJumpOrigin('www')}/static/live/NewPersonalityPoster/index.html?presentId=${getUrlQuery('presentId')}`
    }
}